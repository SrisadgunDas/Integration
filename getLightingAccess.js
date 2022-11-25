import { LightningElement,wire} from 'lwc';
import WIREEDACESS from '@salesforce/apex/getaccessTokenclass.getprovidercases';
import ACCESSRESPONSE from '@salesforce/apex/getaccessTokenclass.GetRequestResponse';
import POSTRESPONSE from '@salesforce/apex/getaccessTokenclass.SendPostRequest';
import DELETECASESWIRE from '@salesforce/apex/getaccessTokenclass.deleteCases';
export default class GetLightingAccess extends LightningElement {
                        GotValuesFrom
                        responsedata
                        Casesvalues 
                        CaseIdPass // parameter caseId
                        withaccessResponse

                        CaseNumber // output case Number
                        caseSubject
                        CaseStatus
                        caseOrigin
                        CasePriority
                        caseId
                        // post   case body
                        
                        PostRequestBody
                        deleteCase


    handleclick(){
        console.log('action is clicked');

            WIREEDACESS().then((result) => {
                        this.GotValuesFrom = result;
                        this.error = undefined;
                        console.log('the access is'+result);

                        
                    })
                    .catch((error) => {
                        this.error = error;
                        this.GotValuesFrom = undefined;
                        console.log('error'+error.jsonStringfy())
                    });
                
                
                }
                onchangeCaseid(event){
                    this.CaseIdPass = event.target.value;
                    console.log('caseid pass==>'+this.CaseIdPass);
                }

//  this is || clicked Response Case Id

                                    onclickgetcaseid(){
                                        ACCESSRESPONSE({Caseid:this.CaseIdPass}).then((result) => {
                                            this.withaccessResponse = JSON.stringify(result);
                                            this.error = undefined;
                                            console.log('the Got Objects is : '+JSON.stringify(result));
                                            const convertthat = JSON.parse(this.withaccessResponse);
                                        this.CaseNumber = convertthat.CaseNumber;
                                        this.caseSubject = convertthat.Subject;
                                        this.CaseStatus = convertthat.Status;
                                        this.caseOrigin = convertthat.Origin;
                                        this.CasePriority = convertthat.Priority;
                                        this.caseId = convertthat.Id;
                                        
                                        console.log('parrsed values'+convertthat)
                                        })



                                        .catch((error) => {
                                            this.error = error;
                                            this.withaccessResponse = undefined;
                                            console.log('error'+error.jsonStringfy)
                                        });
                                    }

                                    PostSendRequest(event){
                                  this.PostRequestBody  =  event.target.value;
                                    }
                                    onhandleSends(){
                                        POSTRESPONSE({ PostTextJson: this.PostRequestBody })
                                        console.log('sended to provider');
                                    }                                

                                    onchangedelete(event){
                                     this.deleteCase = event.target.value;
                                    }

                                    ondeleteCase(){
                                        DELETECASESWIRE({Caseid:this.deleteCase})
                                        console.log('clicked to delete');
                                    }
}