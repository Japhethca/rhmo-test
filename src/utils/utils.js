export const pathGet = (arr1, query) => {
  // TASK 1:
  // Write a function that searches through the input array / object
  // and returns the appropriate string path leading to the input query, if found
  // Example:
  // const a = {
  //    user: {
  //      id: 1,
  //      name: {
  //        firstName: "James",
  //        lastName: "Ibori"
  //      },
  //      location: {
  //        city: "Ikoyi",
  //        state: "Lagos",
  //        address: "One expensive house like that"
  //      }
  //    }
  // }
  // `pathGet(a, 'One expensive house like that')` = "a.user.location.address"
  // `pathGet(a, 'James')` = "a.user.name.firstName"
  // ============== CODE GOES BELOW THIS LINE :) ==============
  let path = "";
  if (!arr1) {
    return "";
  }

  for (let key in arr1) {
    if (typeof arr1[key] !== "object") {
      if (arr1[key] === query) {
        path = `.${key}`;
        return key;
      }
      continue;
    }
    const relPath = pathGet(arr1[key], query);
    if (relPath) {
      path = `${key}.${relPath}`;
    }
  }
  return path;
};
