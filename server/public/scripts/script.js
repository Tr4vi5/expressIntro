console.log('JS');

class Employee{
    constructor(fName, lName, id, title, salary){
        this.firstName = fName;
        this.lastName = lName;
        this.id = id;
        this.title = title;
        this.salary = salary;
    }// end constructor
}// end employee class

let employeeGroup = [];
let monthlyCost = 0;

// why is this not working?  employeeGroup.push(new Employee(Kurt, Vonnegut, 1234, Writer, 100000));

$(readyNow);

function readyNow() {
    console.log('JQ');
    $('#employeeInBtn').on('click', submitEmployee);
    $('#employeeBody').on('click', '#deleteRow', removeEmployee);


    function submitEmployee() {
        let firstName = $('#firstNameIn').val();
        let lastName = $('#lastNameIn').val();
        let id = parseInt($('#employeeIDIn').val());
        let title = $('#titleIn').val();
        let salary = parseInt($('#salaryIn').val());

        if (firstName != '' && lastName !='' && id !='' && title !='' && salary !=''){
           
            employeeGroup.push( new Employee(firstName, lastName, id, title, salary));
            
            let employeeOut = $('#employeeBody');
            employeeOut.empty();
            monthlyCost = 0;

            for (let employee of employeeGroup){ 
                employeeOut.append(
                    `<tr class="tableRow">
                        <td>` + employee.firstName + `</td>
                        <td>` + employee.lastName + `</td>
                        <td>` + employee.id + `</td>
                        <td>` + employee.title + `</td>
                        <td id="indSalary">$` + employee.salary + `</td>
                        <td id="deleteRow" style="background-color:red">X</td> 
                    </tr>`  
                );  // Why was the external CSS for changing the background color of #deleteRow not working?
                
                //$('tr').data('sal', employee.salary);
                // console.log($('tr').data('sal'));
                
                $('#firstNameIn').val('');
                $('#lastNameIn').val('');
                $('#employeeIDIn').val('');
                $('#titleIn').val('');
                $('#salaryIn').val('');

                let monthlySal = employee.salary / 12; 

                monthlyCost += monthlySal;
            }  
            $('#employeeFoot').html(`<td id="totalCost" colspan="5">Monthly Cost: $` + monthlyCost.toFixed(2) +`</td>`); //why did this colspan only work inline? Similar to issue with the #deleteRow button
            console.log(monthlyCost);

            if (monthlyCost.toFixed(2) > 20000){
                $('#totalCost').css({'background-color': 'red', 'color': 'white'});
            }
        }
    }

    // any time that I added any of the commented out code below, it stopped the function from removing the row from the DOM, why is this?
    function removeEmployee(){
        $(this).closest('.tableRow').remove();
        /* let index = $(this).closest('td').parent()[0].sectionRowIndex
        
        employeeGroup.splice(index, 1);*/

        //monthlyCost -= ($(this).closest('tr').data('sal') / 12);
        // $('#employeeFoot').html(`<td id="totalCost" colspan="5">Monthly Cost: $` + monthlyCost.toFixed(2) + `</td>`);*/
        // monthlyCost = 0;
    }
}

// Notes/ideas:
// use jQ to assign each employee.Id to the table row ID as the row is created  <tr id="`employee.id`">