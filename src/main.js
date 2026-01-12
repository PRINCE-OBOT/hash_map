import HashMap from "./hashMap";
import HashSet from "./hashSet";
import { Node, NodeWithValue } from "./node";

const test = new HashMap(NodeWithValue);

test.set("apple", "red");
test.set("banana", "yellow");
test.set("carrot", "orange");
test.set("dog", "brown");
test.set("elephant", "gray");
test.set("frog", "green");

test.display();

const test2 = new HashSet(Node);

test2.set("grown");
test2.set("okay");
test2.set("apple");
test2.set("banana");
test2.set("carrot");
test2.set("dog");
test2.set("elephant");
test2.set("frog");


test2.display();
