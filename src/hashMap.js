import { th } from "date-fns/locale";
import LinkedList from "./linkedList";
import Node from "./node";

const list = new LinkedList();

class HashMap {
  constructor() {
    this.loadFactor = 0.75;
    this.capacity = 16;
    this.arrOfBucket = [];
  }

  hash(key) {
    let hashCode = 0;

    const primeNumber = 31;

    for (let i = 0; i < key.length; i++) {
      hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % this.capacity;
    }

    return hashCode;
  }

  set(key, value) {
    const hashCode = this.hash(key);

    if (!this.arrOfBucket[hashCode])
      this.arrOfBucket[hashCode] = new Node(key, value);

    list.reset(this.arrOfBucket[hashCode]);

    const contains = list.contains(key);

    if (contains) {
      list.update(key, value);
    } else {
      list.append(key, value);

      if (this.length() > this.capacity * this.loadFactor) {
        this.capacity *= 2;

        const entries = this.entries();

        this.arrOfBucket.splice(0);

        this.grow(entries);
      }
    }
  }

  grow(entries) {
    entries.forEach((arrOfKeyAndValue) => {
      const [key, value] = arrOfKeyAndValue;

      this.set(key, value);
    });
  }

  get(key) {
    const hashCode = this.hash(key);

    if (!this.arrOfBucket[hashCode]) return null;

    list.reset(this.arrOfBucket[hashCode]);

    return list.get(key);
  }

  has(key) {
    const hashCode = this.hash(key);

    if (!this.arrOfBucket[hashCode]) return false;

    list.reset(this.arrOfBucket[hashCode]);

    return list.contains(key);
  }

  remove(key) {
    const hashCode = this.hash(key);

    if (!this.arrOfBucket[hashCode]) return false;

    list.reset(this.arrOfBucket[hashCode]);

    const index = list.findIndex(key);

    if (index === -1) return false;
    else {
      list.removeAt(index, this.arrOfBucket, hashCode);
      return true;
    }
  }

  length() {
    return this.arrOfBucket.filter(Boolean).reduce((acc, bucket) => {
      list.reset(bucket);

      return acc + list.size();
    }, 0);
  }

  clear() {
    this.arrOfBucket.splice(0);
  }

  keys() {
    list.reset(this.arrOfBucket);
    return list.keyValue("key");
  }

  values() {
    list.reset(this.arrOfBucket);
    return list.keyValue("value");
  }

  entries() {
    list.reset(this.arrOfBucket);
    return list.entries();
  }

  display() {
    console.log(
      "Array of Bucket",
      this.arrOfBucket,
      "New Capacity",
      this.capacity
    );
  }
}

export default HashMap;
