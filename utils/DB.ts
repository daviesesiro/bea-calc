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

        const txStore = db.createObjectStore("transactions", {
          keyPath: "id",
          autoIncrement: true,
        });
        txStore.createIndex("title-idx", "title");
        txStore.createIndex("personId-idx", "personId");
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
  addTransaction: async ({
    amount,
    description,
    title,
    type,
    personId,
  }: {
    personId: string;
    amount: number;
    description: string;
    title: string;
    type: string;
  }) => {
    const db = await getDb();

    const person = await db.get("persons", personId);

    if (type == "Sending" && person.balance < amount)
      throw Error("Insufficient funds");

    const txId = await db.add("transactions", {
      title,
      amount,
      type,
      description,
      dateAdded: new Date(),
      personId,
      id: uuid(),
    });

    await db.put("persons", {
      ...person,
      balance:
        type == "Sending" ? person.balance - amount : person.balance + amount,
    });
    return txId;
  },
  getTransactionsByPerson: async (id: string) => {
    const db = await getDb();
    return db.getAllFromIndex("transactions", "personId-idx", id);
  },
  getTransactions: async () => {
    return (await getDb()).getAll("transactions");
  },
  getTotalBalance: async () => {
    const db = await getDb();
    return (await db.getAll("persons")).reduce(
      (prev, cur) => prev + cur.balance,
      0
    );
  },
  deleteTransaction: async (
    id: string,
    type: string,
    amount: number,
    personId: string
  ) => {
    const db = await getDb();
    await db.delete("transactions", id);
    const person = await db.get("persons", personId);
    await db.put("persons", {
      ...person,
      balance:
        type == "Sending" ? person.balance + amount : person.balance - amount,
    });
  },
  deletePerson: async (id: string) => {
    const db = await getDb();
    await db.delete("persons", id);

    const tx = db.transaction("transactions", "readwrite");
    const idx = tx.store.index("personId-idx");
    let cursor = await idx.openCursor(id);

    while (cursor) {
      cursor.delete();
      cursor = await cursor.continue();
    }
  },
};
