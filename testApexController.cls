public with sharing class testApexController {

    
	@AuraEnabled(cacheable=true)
    public static List<Account> getAccounts(){
        //try{
            List<Account> acctslist = [select Id,Name,AnnualRevenue from Account];
			return acctslist;    
       /* }
        catch(Exception e){
            system.debug('Exception'+e.getMessage());
            return null;
        }*/
    }
}