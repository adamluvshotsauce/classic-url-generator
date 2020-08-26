import { LightningElement, api, track, wire } from 'lwc';
import getBaseUrl from '@salesforce/apex/UrlUtility_ltg.getBaseUrl';
import { ShowToastEvent } from 'lightning/platformShowToastEvent'

export default class classicUrlGenerator extends LightningElement {

    @api showCurrentRecordTab = false; // tab visibility config
    @api showInputRecordTab = false; // tab visibility config
    // current record props
    @api recordId;
    @track classicUrlCurrentRecord;

    // input record props
    @track inputRecordId;
    @track classicUrlInputRecord;
    @track showInputUrl = false;

    @wire(getBaseUrl) baseUrl; // retrieves and sets the base url for the current SFDC instance

    /**
     * @description Getter property for creating and returning the classic URL for the current record
     */
    get currentRecordUrl() {
        this.classicUrlCurrentRecord = this.baseUrl.data + '/' + this.recordId;
        return this.classicUrlCurrentRecord;
    }

    /**
     * @description Button function for creating the classic URL for the user entered record
     */
    generateInputRecordUrl() {
        if (this.inputRecordId) {
            this.showInputUrl = true;
            this.classicUrlInputRecord = this.baseUrl.data + '/' + this.inputRecordId;
        }
    }

    /**
     * @description Function for handling user updating the input record value
     * @param {event} EventObject Event object of the input a record input box element
     */
    handleInputChange(event) {
        this.inputRecordId = event.target.value;
    }

    /**
     * @description Button function that copies the generated classic link to the clipboard
     *              and fires a toast alert to notify the user of the successful copy
     */
    copyToClipboard() {
        let activeTab = this.template.querySelector('lightning-tabset');
        let linkSelector = this.getLinkSelector(activeTab);

        let linkElement = linkSelector ? this.template.querySelector(linkSelector) : null;

        if (linkElement) {
            linkElement.select();
            document.execCommand('copy');

            // successful copy alert
            const event = new ShowToastEvent({
                "title": "Success!",
                "message": "Classic link copied to clipboard.",
                "variant": "success"
            });

            this.dispatchEvent(event);
        }
        else {
            // failed copy alert
            const event = new ShowToastEvent({
                "title": "Error!",
                "message": "Whoops! Classic link failed to copy! Please try again.",
                "variant": "error"
            });

            this.dispatchEvent(event);
        }
    }

    /**
     * @description Function for identifying the classic link selector for the active tab
     * @param  {activeTab} HTMLElement Tabset element for identifying the active tab    
     * @return {DOMString}
     */
    getLinkSelector(activeTab) {
        switch (activeTab.activeTabValue) {
            case 'Current Record':
                return '.clipboard-link-cr';
            case 'Input a Record':
                return '.clipboard-link-iar';
            default:
                return null;
        }
    }

}