import { v4 as uuid } from "uuid";
import { DBSchema, openDB } from "idb";

export interface IPerson {
  id: string;
  name: string;
  balance: number;
  dateAdded: Date;
}
export interface ITransaction {
  id: string;
  title: string;
  amount: number;
  dateAdded: Date;
  description: string;
  type: string;
  personId: string;
}

interface MyDB extends DBSchema {
  persons: {
    key: string;
    value: IPerson;
    indexes: { "name-idx": string };
  };
  totalBalance: {
    key: number;
    value: number;
  };
  transactions: {
    key: string;
    value: ITransaction;
    indexes: { "title-idx": string; "personId-idx": string };
  };
}
const getDb = async () =>
  openDB<MyDB>("db", 1, {
    upgrade: async (db) => {
      if (
        !db.objectStoreNames.contains("persons") &&
        !db.objectStoreNames.contains("transactions")
      ) {
        const totalBalanceStore = db.createObjectStore("totalBalance", {
          autoIncrement: true,
        });
        totalBalanceStore.add(0, 1);

        db.createObjectStore("persons", {
          keyPath: "id",
          autoIncrement: true,
        }).createIndex("name-idx", "name", { unique: true });

        db.createObjectStore("transactions", {
          keyPath: "id",
          autoIncrement: true,
        }).createIndex("title-idx", "title");
      }
    },
  });

export default {
  addPerson: async (name: string) => {
    const db = await getDb();
    return db.add("persons", {
      id: uuid(),
      name,
      balance: 0,
      dateAdded: new Date(),
    });
  },
  getPersons: async () => {
    const db = await getDb();
    return db.getAll("persons");
  },
  getPersonById: async (id: string) => {
    const db = await getDb();
    return db.get("persons", id);
  },
  addTransaction: (amount: number) => {},
  getTotalBalance: async () => {
    const db = await getDb();
    return db.get("totalBalance", 1);
  },
};
