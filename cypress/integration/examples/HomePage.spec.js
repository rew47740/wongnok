const { Item } = require("semantic-ui-react")
const date ={
    "dateStart" : "24-11-2020",
    "dateEnd" : "25-11-2020"
}
const url = "http://localhost:3000/"
const urlConfirm = "http://localhost:3000/ComfirmInfo"
// let statusCode = require("../../../fixtures/expected_status.json")

describe('HomePage Booking', function(){
    it('Test Home Page', function(){
        cy.visit(url)
        // Test click button Map 
        cy.get('a[href*="#Map"]').click();
        // Test click button Contact 
        cy.get('a[href*="#Contact"]').click();
        // Test click button upload receipt 
         cy.get('a[href*="/ComfirmInfo"]').click()
        // dropdown-container
        // cy.get('button').click(({ multiple: true }))
    })
    it ('Test Click Btn DatePicker', function(){
        cy.visit(url)
        // <span class="ant-picker-cell-inner ant-calendar-picker" 
        cy.get('[class="ant-picker-cell-inner ant-calendar-picker"]').click()
        cy.get('[class="ui button"]').click({force: true})
    })
    it ('Test Confirm Info ', function(){
        // <button type="button" class="" 
        cy.visit(urlConfirm)
        cy.get('button[class="ant-btn add-receipt ant-btn-primary"]').click()
        // <input type="number" name="phoneNum" class="form-control is-invalid" 
        cy.get('input[id="phoneNum"]').type("0891115491")
        // <input type="bookingId" name="bookingId" class="form-control " id="bookingId" placeholder="Enter Booking Id" style="width: 10cm; margin-left: 10%; margin-top: 3%;" value="">
        // <input type="number" name="phoneNum" class="form-control " id="phoneNum" placeholder="Enter Phone Number" style="width: 10cm; margin-left: 10%;" value="">
        cy.get('input[id="bookingId"]').type("2658")
        cy.get('button[class="ant-btn ant-btn-primary"]').click({ multiple: true })
        // <button style="margin-top: 3%; margin-left: 40%; font-family: Kanit, sans-serif;" type="button" class="ant-btn ant-btn-primary"><span>ค้นหา</span></button>
    })
})