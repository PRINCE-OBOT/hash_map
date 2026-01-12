import HashSet from "./hashSet";

export default class HashMap extends HashSet {}

const prototypeMethod = {
  update: function (key, value) {
    this.list.update(key, value);
  },
  value: function () {
    this.list.reset(this.arrOfBucket);
    return this.list.keyValue("value");
  },
  get: function (key) {
    const hashCode = this.hash(key);

    if (!this.arrOfBucket[hashCode]) return null;

    this.list.reset(this.arrOfBucket[hashCode]);

    return this.list.get(key);
  },
  entries: function () {
    this.list.reset(this.arrOfBucket);
    return this.list.entries();
  },
  grow: function () {
    const entries = this.entries();
    this.arrOfBucket.splice(0);

    entries.forEach((arrOfKeyAndValue) => {
      const [key, value] = arrOfKeyAndValue;
      this.set(key, value);
    });
  }
};

for (let method in prototypeMethod) {
  HashMap.prototype[method] = prototypeMethod[method];
}
