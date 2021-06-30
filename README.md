# Weather Clock

The main goal of this project is to practice javascript and learn react fundamentals.

**todo:** Time is chosen in UTC/GMT but displayed in local format

## JS concepts I studied

### Proxy Server

- Created a simple Nodejs script to fetch() data from api using hidden API KEY
- Stored API KEY in .env file and ensured its addition into .gitignore file

### API fetching

- Retrieved and parsed JSON data through [Openweatherapi](https://openweathermap.org/api)

### Datetime Objects

- creating datetime objects through its constructor and epoch unix time from JSON objects
- retrieving information from said objects
  - getDate(), getMonth(), etc...
  - toLocaleTimeString()

### ES6 best practices

- Defaulting to const and using var/let only with dynamic data
- Using arrow and callback functions mainly to practice syntax and deal with asynchronous behavior

### Template strings

- Passing in ${variables} to dynamically create strings

### Promises

- Utilizing callback functions for success or catching failure

## React concepts I learned

### File structure + Hosting

- Used create-react-app to simplify project setup

### Classes

- Created basic classes for each component
- Utilized lifecycle methods such as componentDidMount() and render()

### Components and Props

- Created card component without a class to be used within weather class
- Passed data via props to card component

### Hooks (not used in final)

- Learned to use hooks but since most of the code is class based, I utilized setState() instead
