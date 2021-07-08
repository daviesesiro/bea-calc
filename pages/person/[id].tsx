import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Header from "../../components/Header";
import Layout from "../../components/Layout";
import Transaction from "../../components/Transaction";
import Modal from "../../components/Modal";
import DB from "../../utils/DB";
import { useStateContext } from "../../Context";
import Balance from "../../components/Balance";

const Index = () => {
  const router = useRouter();
  let { id } = router.query;
  if (typeof window != "undefined") {
    id = id || window.location.pathname.split("person/")[1];
  }
  const params = new URLSearchParams(router.asPath.split("?")[1]);
  const personName = params.get("name");

  const [showAddTran, setShowAddTran] = useState(false);

  const [formState, setformState] = useState({
    title: "",
    amount: 0,
    description: "",
    type: "Receiving",
  });
  const { state, setState } = useStateContext();
  const txs = state.transactions[id as string];
  const handleOnChange = (e) => {
    let { name, value } = e.target;

    if (name == "amount") {
      value = value.replaceAll(",", "");
      if (value.length !== 0 && isNaN(parseInt(value[value.length - 1]))) {
        return;
      }
    }

    setformState((prev) => ({
      ...prev,
      [name]: name == "amount" ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formState.amount < 50) {
      alert("Amount must be greater than 50 naira");
      return;
    }
    const transactionId = (await DB.addTransaction({
      ...formState,
      personId: id as string,
    })) as string;
    setState((old) => {
      return {
        ...old,
        totalBalance:
          formState.type === "Receiving"
            ? old.totalBalance + formState.amount
            : old.totalBalance - formState.amount,
        persons: old.persons.map((person) => {
          if (person.id == id) {
            return {
              ...person,
              balance:
                formState.type == "Receiving"
                  ? person.balance + formState.amount
                  : person.balance - formState.amount,
            };
          }
          return person;
        }),
        transactions: {
          ...old.transactions,
          [id as string]: [
            {
              ...formState,
              dateAdded: new Date(),
              id: transactionId,
              personId: id as string,
            },
            ...(old.transactions[id as string] || []),
          ],
        },
      };
    });
    setShowAddTran(false);
  };
  return (
    <Layout>
      <Header
        title={`${(personName || "").split(" ")[0]}'s transactions`}
        actions={[
          {
            icon: (
              <svg
                width={20}
                height={20}
                className="dark:text-gray-400"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 5V19"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M5 12H19"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            ),
            onPress: () => {
              setShowAddTran((prev) => !prev);
            },
          },
          {
            icon: (
              <svg
                width={20}
                height={20}
                viewBox="0 0 17 18"
                className="dark:text-gray-400"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1 4.2H2.6H15.4"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M5.00001 4.2V2.6C5.00001 2.17565 5.16858 1.76869 5.46864 1.46863C5.76869 1.16857 6.17566 1 6.60001 1H9.80001C10.2244 1 10.6313 1.16857 10.9314 1.46863C11.2314 1.76869 11.4 2.17565 11.4 2.6V4.2M13.8 4.2V15.4C13.8 15.8243 13.6314 16.2313 13.3314 16.5314C13.0313 16.8314 12.6244 17 12.2 17H4.20001C3.77566 17 3.36869 16.8314 3.06864 16.5314C2.76858 16.2313 2.60001 15.8243 2.60001 15.4V4.2H13.8Z"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            ),
            onPress: async () => {
              if (confirm("Are you sure you want to delete this person? ")) {
                await DB.deletePerson(id as string);
                setState((old) => {
                  delete old.transactions[id as string];
                  return {
                    ...old,
                    totalBalance:
                      old.totalBalance -
                      old.persons.find((x) => x.id == (id as string)).balance,
                    persons: old.persons.filter((x) => x.id != id),
                    transactions: old.transactions,
                  };
                });

                router.push("/");
              }
            },
          },
        ]}
      />

      <Balance
        title="BALANCE"
        balance={
          (state.persons &&
            state.persons.find((x) => x.id == id) &&
            state.persons.find((x) => x.id == id).balance) ||
          0
        }
      />

      {/* Transaction */}
      <p className="dark:text-gray-400 mx-5 mt-8 text-gray-700">Transactions</p>

      <div className="mt-8">
        {txs && txs.length > 0 ? (
          txs.map(
            ({ title, personId, amount, type, id, description, dateAdded }) => (
              <Transaction
                key={`tx-${id}`}
                amount={amount}
                id={id}
                title={title}
                type={type}
                description={description}
                transactionDate={dateAdded}
                personId={personId}
              />
            )
          )
        ) : (
          <p className="dark:text-gray-300 mt-10 text-lg text-center">
            No transactions done yet
          </p>
        )}
      </div>

      {showAddTran && (
        <Modal
          closeModal={() => setShowAddTran(false)}
          subtitle={`For ${personName}`}
          title="Add a transaction"
        >
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="dark:text-gray-200 block mb-1" htmlFor="title">
                *Title
              </label>
              <input
                onChange={handleOnChange}
                required
                value={formState.title}
                className="focus:outline-none dark:bg-gray-300 w-full p-3 text-lg bg-gray-100 rounded-lg"
                placeholder="For cement"
                id="title"
                type="text"
                name="title"
              />
            </div>
            <div className="mb-4">
              <label className="dark:text-gray-200 block mb-1" htmlFor="amount">
                *Amount
              </label>
              <input
                onChange={handleOnChange}
                value={formState.amount.toLocaleString()}
                required
                className="focus:outline-none dark:bg-gray-300 w-full p-3 text-lg bg-gray-100 rounded-lg"
                placeholder="1,000"
                id="amount"
                name="amount"
              />
            </div>
            <div className="mb-4">
              <label
                className="dark:text-gray-200 block mb-1"
                htmlFor="description"
              >
                Descripton
              </label>
              <textarea
                onChange={handleOnChange}
                value={formState.description}
                className="focus:outline-none dark:bg-gray-300 w-full p-3 text-lg bg-gray-100 rounded-lg"
                placeholder="Write something to describe the transaction"
                id="description"
                name="description"
              />
            </div>
            <div className="mb-10 text-center align-middle">
              <input
                checked={formState.type == "Receiving"}
                onChange={handleOnChange}
                className="inline-block w-4 h-4 mr-2 align-middle"
                type="radio"
                required
                name="type"
                id="receiving"
                value="Receiving"
              />{" "}
              <label
                htmlFor="receiving"
                className="dark:text-gray-200 align-middle"
              >
                {" "}
                Credit
              </label>
              <input
                checked={formState.type == "Sending"}
                onChange={handleOnChange}
                className=" inline-block w-4 h-4 ml-8 mr-2 align-middle"
                type="radio"
                required
                name="type"
                id="sending"
                value="Sending"
              />{" "}
              <label
                className="dark:text-gray-200 align-middle"
                htmlFor="sending"
              >
                Debit
              </label>
            </div>

            <button className="active:bg-blue-800 focus:outline-none block w-full py-3 text-sm font-normal text-white bg-blue-700 rounded-lg">
              Add Transaction
            </button>
          </form>
        </Modal>
      )}
    </Layout>
  );
};

export default Index;
