// Your code here
function createEmployeeRecord(arr){
    return {
        firstName: arr[0],
        familyName: arr[1],
        title: arr[2],
        payPerHour: arr[3],
        timeInEvents: [],
        timeOutEvents: []
    };
}

function createEmployeeRecords(arr){
    let newArr = [];
    arr.forEach(element => {
       newArr.push(createEmployeeRecord(element)); 
    });
    return newArr;
}

function createTimeInEvent(employee,time){
    let newEvent = {
        type: "TimeIn",
        hour: parseInt(time.slice(11),10),
        date: time.slice(0,10)
    };
    employee.timeInEvents.push(newEvent);
    return employee;
}

function createTimeOutEvent(employee,time){
    let newEvent = {
        type: "TimeOut",
        hour: parseInt(time.slice(11),10),
        date: time.slice(0,10)
    }
    employee.timeOutEvents.push(newEvent);
    return employee;
}

function hoursWorkedOnDate(employee, day){
    let inn = 0;
    let out = 0;
    employee.timeInEvents.forEach(element => {
        if(element.date === day){
            inn = element.hour / 100;
            employee.timeOutEvents.forEach(element => {
                if(element.date === day){
                    out = element.hour / 100;
                }
            })
        }
    })
    return out - inn;
}

function wagesEarnedOnDate(employee, day){
    return hoursWorkedOnDate(employee, day) * employee.payPerHour;
}  

function allWagesFor(employee){
    let datesWorked = [];
    employee.timeInEvents.forEach(element => {
        datesWorked.push(element.date);
    });
    let wage = 0;
    datesWorked.forEach(day => {
        wage += wagesEarnedOnDate(employee,day); 
    })
    return wage;
}

function calculatePayroll(employeeArr){
    let payRoll = 0;
    employeeArr.forEach(employee => {
        payRoll += allWagesFor(employee); 
    })
    return payRoll;
}