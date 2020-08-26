@isTest
private class UrlUtility_ltg_Test {
    
    /**********************************************************************************************
    *
    * Unit Tests
    *
    **********************************************************************************************/

    @isTest
    static void testGetBaseUrl() {
        // assert the base url returned is the base url for the current instance
        System.assertEquals(
            URL.getSalesforceBaseUrl().toExternalForm(), UrlUtility_ltg.getBaseUrl(), 
            'Yikes! Looks like the Salesforce Base URLs do not match.');
    }
}