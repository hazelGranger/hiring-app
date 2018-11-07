const icons = (state = 1, action) => {
  switch (action.type) {
    case "ADD":
      return ++state
    case "REMOVE":
      return state > 1? --state : state
    default:
      return state
  }
}

export default icons;
