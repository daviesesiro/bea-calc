import React, { createContext, useContext, useEffect, useState } from "react";
import DB, { IPerson, ITransaction } from "./utils/DB";

const StateContext = createContext<{ state: IState, setState: React.Dispatch<React.SetStateAction<IState>> }>(null)

export const useStateContext = () => useContext(StateContext)

type IState = {
    totalBalance: number;
    persons: IPerson[]
    transactions: { [key: string]: ITransaction[] }
}
export const StateContextProvider: React.FC = ({ children }) => {


    const [state, setState] = useState<IState>({ totalBalance: 0, persons: [], transactions: {} })
    useEffect(() => {
        async function init() {
            const persons = await DB.getPersons()
            const totalBalance = await DB.getTotalBalance()
            const transactions = (await DB.getTransactions())
                .slice()
                .sort((a, b) => new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime())
                .reduce((acc, cur) => {
                    const key = cur.personId
                    if (!acc[key]) {
                        acc[key] = []
                    }
                    acc[key].push(cur);
                    return acc
                }, {})
            setState(old => ({ ...old, persons, totalBalance, transactions }));
        }

        init()
    }, [state.totalBalance])


    return <StateContext.Provider value={{ state, setState }}>
        {children}
    </StateContext.Provider>
}