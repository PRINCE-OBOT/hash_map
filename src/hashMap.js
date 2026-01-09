import LinkedList from "./linkedList";
import Node from "./node";

class HashMap {
  capacity = 16;

  constructor() {
    this.loadFactor = 0.75;
    this.capacityNew = this.capacity;
    this.arrOfBucket = [];
  }

  hash(key) {
    let hashCode = 0;

    const primeNumber = 31;

    for (let i = 0; i < key.length; i++) {
      hashCode =
        (primeNumber * hashCode + key.charCodeAt(i)) % this.capacityNew;
    }

    return hashCode;
  }

  set(key, value) {
    const hashCode = this.hash(key);

    if (!this.arrOfBucket[hashCode])
      this.arrOfBucket[hashCode] = new Node(key, value);

    const list = new LinkedList(this.arrOfBucket[hashCode]);

    const contains = list.contains(key);

    if (contains) {
      list.update(key, value);
    } else {
      list.append(key, value);

      if (this.length() > this.capacityNew * this.loadFactor) {
        this.capacityNew = this.capacityNew + this.capacity;
      }
    }
  }

  get(key) {
    const hashCode = this.hash(key);

    if (!this.arrOfBucket[hashCode]) return null;

    const list = new LinkedList(this.arrOfBucket[hashCode]);

    return list.get(key);
  }

  has(key) {
    const hashCode = this.hash(key);

    if (!this.arrOfBucket[hashCode]) return false;

    const list = new LinkedList(this.arrOfBucket[hashCode]);

    return list.contains(key);
  }

  remove(key) {
    const hashCode = this.hash(key);

    if (!this.arrOfBucket[hashCode]) return false;

    this.arrOfBucket[hashCode] = null;

    return true;
  }

  length() {
    return this.arrOfBucket
      .filter(Boolean)
      .reduce((acc, bucket) => acc + new LinkedList(bucket).size(), 0);
  }

  clear() {
    this.arrOfBucket.splice(0);
  }

  keys() {
    const list = new LinkedList(this.arrOfBucket);
    return list.keyValue("key");
  }

  values() {
    const list = new LinkedList(this.arrOfBucket);
    return list.keyValue("value");
  }

  entries() {
    const list = new LinkedList(this.arrOfBucket);
    return list.entries();
  }

  display() {
    console.log(
      "Array of Bucket",
      this.arrOfBucket,
      "New Capacity",
      this.capacityNew
    );
  }
}

export default HashMap;
