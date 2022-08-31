const userMock1 = {
  id: "abcde-1",
  email: "ktkim@elicer.com",
  name: "튜터",
  description: "안녕하세요!",
  educations: [
    {
      id: "1",
      school: "서울대",
      major: "의류",
      position: "학사",
      user_id: "abcde-1",
    },
  ],
};
const userMock2 = {
  id: "abcde-12",
  email: "ironman@avengers.com",
  name: "아이언맨",
  description: "I, am, Ironman",
  educations: [
    {
      id: "12",
      school: "고려대",
      major: "소프트웨어",
      position: "박사",
      user_id: "abcde-12",
    },
  ],
};
const userMock3 = {
  id: "abcde-123",
  email: "captain_america@avengers.com",
  name: "캡틴아메리카",
  description: "I can do this all day",
  educations: [
    {
      id: "123",
      school: "충북대",
      major: "식품",
      position: "석사",
      user_id: "abcde-123",
    },
  ],
};
const userMock4 = {
  id: "abcde-1234",
  email: "thor@avengers.com",
  name: "토르",
  description: "Strongest Avenger",
  educations: [
    {
      id: "1234",
      school: "한기대",
      major: "컴공",
      position: "학사",
      user_id: "abcde-1234",
    },
  ],
};
const userMock5 = {
  id: "abcde-12345",
  email: "natasha@avengers.com",
  name: "나타샤",
  description: "Strongest Agent",
  educations: [
    {
      id: "12345",
      school: "서시대",
      major: "기계",
      position: "학사",
      user_id: "abcde-12345",
    },
  ],
};

let userlist = [userMock1, userMock2, userMock3, userMock4, userMock5];

async function get(endpoint, params = "") {
  console.log(`%cGET 요청 ${"/" + endpoint + "/" + params}`, "color: #a25cd1;");

  if (endpoint === "users") {
    const matchingUser = userlist.find((user) => user.id === params);
    return { data: matchingUser };
  }

  if (endpoint === "userlist") {
    const data = userlist;
    return { data };
  }
  if (endpoint === "educationlist") {
    const matchingEducations = userlist.find(
      (user) => user.id === params
    ).educations;
    if (!matchingEducations) {
      return { data: [] };
    }
    return { data: matchingEducations };
  }
  return;
}

async function post(endpoint, data) {
  console.log(
    `%cPOST 요청 ${"/" + endpoint + "/"}, 데이터: ${JSON.stringify(data)}`,
    "color: blue;"
  );

  if (endpoint === "user/register") {
    const newUser = { ...data, educations: [] };
    newUser.description = "설명이 없습니다. 설명을 추가해 주세요.";
    const random = Math.random();
    newUser.id = `abcde-${random}`;

    userlist.push(newUser);
    return { data: newUser };
  }

  if (endpoint === "user/login") {
    const matchingUser = userlist.find((user) => user.email === data.email);
    matchingUser.token = "temp-token";
    console.dir(matchingUser);
    return { data: matchingUser };
  }

  if (endpoint === "education/add") {
    const { user_id, school, major, position } = data;
    const matchingUser = userlist.find((user) => user.id === user_id);
    const random = Math.random();
    const id = `abcde-${random}`;
    console.log(matchingUser);

    matchingUser.educations.push({ id, school, major, position, user_id });
    console.dir(matchingUser);
    return { data: matchingUser };
  }

  return;
}

async function put(endpoint, data) {
  console.log(
    `%cPUT 요청 ${"/" + endpoint + "/"}, 데이터: ${JSON.stringify(data)}`,
    "color: green;"
  );

  const urlAndId = endpoint.split("/");
  const req = urlAndId.shift(); // 요청한 mvp
  const req_id = urlAndId[0]; // 요청 mvp id
  if (req === "users") {
    data.id = req_id;
    userlist = userlist.filter((user) => user.id !== req_id);
    userlist.push(data);

    const response = { data };
    return response;
  }

  if (req === "educations") {
    const matchingEducations = userlist.find(
      //data.userid로 유저 찾기
      (user) => user.id === data.user_id
    );

    console.log(matchingEducations);
    matchingEducations.educations = matchingEducations.educations.filter(
      //찾은 유저에서 받아온 education.id랑 같은 education 제거
      (education) => education.id !== req_id
    );
    console.log(matchingEducations.educations);

    matchingEducations.educations.push({ id: req_id, ...data }); // 새로운 data 삽입

    const response = { data };

    return response;
  }
}
async function del(endpoint, params = "") {
  console.log(
    `%cDELETE 요청 ${"/" + endpoint + "/" + params}`,
    "color: #a25cd1;"
  );

  if (endpoint === "educations") {
    const matchingUser = userlist.find(
      (user) => user.educations.find((education) => education.id === params) //user educations 찾기
    );
    matchingUser.educations = matchingUser.educations.filter(
      // education id와 같은 education 필터해서 삭제
      (education) => education.id !== params
    );

    const response = { endpoint };

    return response;
  }
}

// 아래처럼 export한 후, import * as A 방식으로 가져오면,
// A.get, A.put 로 쓸 수 있음.
export { get, post, put, del as delete };
