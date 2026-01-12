import LinkedList from "./linkedList";

export default class HashSet {
  constructor(NODE) {
    this.NODE = NODE;
    this.list = new LinkedList(NODE);
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

  has(key) {
    const hashCode = this.hash(key);

    if (!this.arrOfBucket[hashCode]) return false;

    this.list.reset(this.arrOfBucket[hashCode]);

    return this.list.contains(key);
  }

  remove(key) {
    const hashCode = this.hash(key);

    if (!this.arrOfBucket[hashCode]) return false;

    this.list.reset(this.arrOfBucket[hashCode]);

    const index = this.list.findIndex(key);

    if (index === -1) return false;
    else {
      this.list.removeAt(index, this.arrOfBucket, hashCode);
      return true;
    }
  }

  set(key, value) {
    const hashCode = this.hash(key);

    const nodes = this.list.nodeKeyChecker(key, value);

    if (!this.arrOfBucket[hashCode]) this.arrOfBucket[hashCode] = nodes;
    else {
    }
    this.list.reset(this.arrOfBucket[hashCode]);

    const contains = this.list.contains(key);

    if (contains) {
      if (this.update) this.update(key, value);
    } else {
      this.list.append(key, value);

      if (this.length() > this.capacity * this.loadFactor) {
        this.capacity *= 2;

        this.grow();
      }
    }
  }

  grow() {
    const keys = this.keys();
    this.arrOfBucket.splice(0);
    keys.forEach((key) => this.set(key));
  }

  length() {
    return this.arrOfBucket.filter(Boolean).reduce((acc, bucket) => {
      this.list.reset(bucket);

      return acc + this.list.size();
    }, 0);
  }

  clear() {
    this.arrOfBucket.splice(0);
  }

  keys() {
    this.list.reset(this.arrOfBucket);
    return this.list.keyValue("key");
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
