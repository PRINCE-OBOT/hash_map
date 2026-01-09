import Node from "./node";

export default class LinkedList {
  constructor(list) {
    this.list = list;
  }

  append(key, value) {
    if (!this.list) {
      this.list = new Node(key, value);
    } else {
      const recursive = (node) => {
        if (node.nextNode) {
          recursive(node.nextNode);
        } else {
          node.nextNode = new Node(key, value);
        }
      };

      recursive(this.list);
    }
  }

  size() {
    if (!this.list) {
      return 0;
    } else {
      const recursive = (node, numberOfNode) => {
        if (node.nextNode) {
          numberOfNode++;
          return recursive(node.nextNode, numberOfNode);
        }
        return numberOfNode;
      };
      return recursive(this.list, 1);
    }
  }

  contains(key) {
    if (!this.list) return false;
    else {
      const recursive = (node) => {
        if (node.key === key) {
          return true;
        }
        if (!node.nextNode) return false;

        return recursive(node.nextNode);
      };
      return recursive(this.list);
    }
  }

  keyValue(key) {
    const arrOfKeyValue = [];

    const recursive = (node) => {
      arrOfKeyValue.push(node[key]);

      if (!node.nextNode) return;

      return recursive(node.nextNode);
    };

    this.list.filter(Boolean).forEach(recursive);

    return arrOfKeyValue;
  }

  entries() {
    const arrOfKeyValue = [];

    const recursive = (node) => {
      arrOfKeyValue.push([node.key, node.value]);

      if (!node.nextNode) return;

      return recursive(node.nextNode);
    };

    this.list.filter(Boolean).forEach(recursive);

    return arrOfKeyValue;
  }

  update(key, value) {
    const recursive = (node) => {
      if (node.key === key) {
        node.value = value;
      }
      if (!node.nextNode) return;

      recursive(node.nextNode);
    };

    recursive(this.list);
  }

  get(key) {
    const recursive = (node) => {
      if (node.key === key) {
        return node.value;
      }
      if (!node.nextNode) return null;

      return recursive(node.nextNode);
    };

    return recursive(this.list);
  }

  findIndex(key) {
    if (!this.list) return -1;
    else {
      const recursive = (node, index) => {
        if (node.key === key) {
          return index;
        }
        if (!node.nextNode) return -1;

        index++;
        return recursive(node.nextNode, index);
      };

      return recursive(this.list, 0);
    }
  }

  display() {
    console.log(this.list);
  }
}
