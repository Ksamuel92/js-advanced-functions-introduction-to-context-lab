// Your code here
function createEmployeeRecord(array){
let employeeRecord = {};

employeeRecord["firstName"] = array[0];
employeeRecord["familyName"] = array[1];
employeeRecord["title"] = array[2];
employeeRecord["payPerHour"] = array[3];
employeeRecord["timeInEvents"] = [];
employeeRecord["timeOutEvents"] = [];

return employeeRecord;

}

function createEmployeeRecords(arrayOfArrays){
  return arrayOfArrays.map(array => createEmployeeRecord(array))
}

function createTimeInEvent(employeeRecord, dateStamp){
  const timeInEvent = {};
  timeInEvent["type"] = "TimeIn"
  timeInEvent["hour"] = parseInt(dateStamp.split(" ")[1])
  timeInEvent["date"] = dateStamp.split(" ")[0];
  
  employeeRecord["timeInEvents"].push(timeInEvent)

  return employeeRecord
}

function createTimeOutEvent(employeeRecord, dateStamp){
  const timeOutEvent = {};
  timeOutEvent["type"] = "TimeOut"
  timeOutEvent["hour"] = parseInt(dateStamp.split(" ")[1])
  timeOutEvent["date"] = dateStamp.split(" ")[0];
  
  employeeRecord["timeOutEvents"].push(timeOutEvent)

  return employeeRecord
}

function hoursWorkedOnDate(employeeRecord, date){
const timeInDate = employeeRecord["timeInEvents"].find(dateStamp => dateStamp["date"] === date )
const timeOutDate = employeeRecord["timeOutEvents"].find(dateStamp => dateStamp["date"] === date)

const hoursWorked = (timeOutDate["hour"]/100) - (timeInDate["hour"]/100)
return hoursWorked
}


function wagesEarnedOnDate(employeeRecord, date){
  const hoursWorked = hoursWorkedOnDate(employeeRecord, date)
  return hoursWorked * employeeRecord["payPerHour"]
}

function allWagesFor(employeeRecord){
const datesArray = employeeRecord["timeInEvents"].map(timeInEvent => timeInEvent["date"])

const arrayOfWages = datesArray.map(date => wagesEarnedOnDate(employeeRecord, date))

const reducer = (previousValue, currentValue) => previousValue + currentValue

const allWages = arrayOfWages.reduce(reducer)

return allWages
}

function findEmployeeByFirstName(srcArray, firstName){
  return srcArray.find(employeeRecord => employeeRecord["firstName"] === firstName)
}

function calculatePayroll(srcArray){
const wagesOfAllEmployees = srcArray.map(employeeRecord => allWagesFor(employeeRecord))

const totalPayroll = wagesOfAllEmployees.reduce((p,v) => p+v)
return totalPayroll
}
