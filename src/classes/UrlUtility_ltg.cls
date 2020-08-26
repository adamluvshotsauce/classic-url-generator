public class UrlUtility_ltg {
    
    @AuraEnabled(cacheable=true)
    public static String getBaseUrl() {
        return URL.getSalesforceBaseUrl().toExternalForm();
    }
}