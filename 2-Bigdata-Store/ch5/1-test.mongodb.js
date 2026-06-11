use("modelingDB");
// 주소를 users 문서 안에 중첩
db.users.insertOne({
  name: "lsy",
  age: 30,
  address: { city: "busan", zip: "12345", street: "중앙대로" },
});

// 주문 안에 상품 목록(items)을 배열로 임베디드
use("modelingDB");
db.orders.insertOne({
  orderId: "A001",
  items: [
    { product: "Laptop", price: 1200, quantity: 1 },
    { product: "Mouse", price: 25, quantity: 2 },
  ],
});

// 1) 사용자 먼저 생성 → _id 확보
use("modelingDB");
const userId = ObjectId();
db.users.insertOne({ _id: userId, name: "Alice", email: "alice@example.com" });

// 2) 주문은 userId로 사용자를 "참조"
use("modelingDB");
db.orders.insertOne({
  orderNumber: 1001,
  userId: userId, // 참조 — 중복 없이 연결
  total: 250,
  orderDate: new Date(),
});

use("modelingDB");
// 최상위 카테고리(parentId: null) → 하위 카테고리
const electronics = ObjectId();
db.categories.insertOne({ _id: electronics, name: "전자제품", parentId: null });
db.categories.insertOne({ name: "컴퓨터", parentId: electronics }); // 전자제품의 자식

// 댓글·대댓글도 동일 패턴
const c1 = ObjectId();
db.comments.insertOne({
  _id: c1,
  text: "첫 댓글",
  parentId: null,
  author: "Grace",
});
db.comments.insertOne({
  text: "첫 댓글의 답글",
  parentId: c1,
  author: "Heidi",
});

use("modelingDB");
// users 컬렉션 생성 시 규칙 지정: name·email 필수, age는 18 이상 정수
db.createCollection("members", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["name", "email"],
      properties: {
        name: { bsonType: "string", description: "필수 문자열" },
        age: { bsonType: "int", minimum: 18, description: "18세 이상" },
        email: {
          bsonType: "string",
          pattern: "^.*@.*\\..*$",
          description: "이메일 형식",
        },
      },
    },
  },
});

use("modelingDB");
db.members.insertOne({ name: "Alice", email: "alice@example.com", age: 25 }); // ✅ 성공
use("modelingDB");
db.members.insertOne({ name: "Bob", email: "bobexample.com", age: 30 }); // ❌ @ 없음 → 거부
use("modelingDB");
db.members.insertOne({ email: "charlie@example.com", age: 22 }); // ❌ name 누락 → 거부

// 검증 규칙 확인 / 임시 해제
db.getCollectionInfos({ name: "members" });
db.runCommand({ collMod: "members", validator: {} }); // 검증 제거
