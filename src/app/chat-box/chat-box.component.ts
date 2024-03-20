import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { NgFor,NgIf } from '@angular/common';
import OpenAI from 'openai';
import { environment } from '../../environments/environment';
import { Observable,from, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { routes } from '../app.routes';
interface Message {
  role: string;
  content: string;
}
interface Choice {
  index: number;
  message: {
    role: string;
    content: string;
  };
  logprobs: any; // You can replace 'any' with the appropriate type if needed
  finish_reason: string;
}
interface tempelate{

      id: Number,
      description: String,
      contract_type: String,
      Summary : String

}
interface ChatCompletion {
  id: string;
  object: string;
  created: number;
  model: string;
  choices: Choice[];
  usage: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
  system_fingerprint: string;
}

@Component({
  standalone: true,
  selector: 'app-chat-box',
  templateUrl: './chat-box.component.html',
  imports: [FormsModule,NgFor,HttpClientModule,NgIf],
  styleUrls: ['./chat-box.component.css']
})
export class ChatBoxComponent {


  

  messages: Message[] = [];
  newMessage: string = '';
  openai=new OpenAI({ apiKey: environment.apiKey ,dangerouslyAllowBrowser: true })
  baseUrl='https://api.openai.com/v1/chat/completions'
  constructor(private http: HttpClient) {

  }

  
  tempelates:tempelate[] =[]
  ngOnInit(): void {

    this.tempelates.push({
      id: 1157,
      description: "This is a msa contract for seller",
      contract_type: " msa one ",
      Summary : `Purpose:
    This contract is used when a seller (vendor) provides managed services (MSA) to a customer.
    Key Provisions:
    Scope of Services: Defines the specific services to be provided by the seller, including the level of support, availability, and performance metrics.
    Pricing and Payment: Outlines the pricing structure, payment terms, and any additional fees.
    Term and Termination: Specifies the duration of the contract and the conditions for termination.
    Service Level Agreement (SLA): Sets out the agreed-upon performance standards and consequences for breaches.
    Intellectual Property: Defines ownership and rights to any intellectual property created or used during the provision of services.
    Confidentiality and Data Protection: Protects sensitive information exchanged between the parties.
    Warranties and Liability: Outlines the seller's warranties and limitations of liability.
    Governing Law and Dispute Resolution: Specifies the governing law and the process for resolving disputes.
    When to Use:
    This contract is appropriate when:
    The seller is providing ongoing, managed services to the customer.
    The services require a high level of availability, performance, and support.
    The parties need to clearly define the scope of services, pricing, and performance expectations.
    The parties want to protect their intellectual property and confidential information.
    The parties need to establish a clear framework for dispute resolution.`,

    })
    this.tempelates.push({
      id: 7102,
      description: "This is a msa contract for buyer",
      contract_type: " msa two",
      Summary : `Summary of MSA Buyer Contract
Purpose:
The MSA Buyer Contract is a legal agreement that defines the terms and conditions for the purchase of goods or services between a buyer and a seller.
When to Use:
This contract is typically used when:
The buyer is making a substantial purchase that requires detailed specifications and contractual protections.
The purchase involves a long-term relationship between the buyer and seller.
The goods or services being purchased are complex or highly customized.
The parties want to establish clear expectations and minimize the risk of disputes.
Key Provisions:
Scope of Work: Defines the specific goods or services to be provided.
Pricing and Payment Terms: Specifies the price, payment schedule, and any applicable taxes or fees.
Delivery and Acceptance: Outlines the delivery timeline, acceptance criteria, and any warranties or guarantees.
Intellectual Property: Protects the intellectual property rights of both parties.
Confidentiality: Ensures the confidentiality of sensitive information exchanged during the transaction.
Termination: Specifies the grounds for termination and the consequences of such termination.
Dispute Resolution: Outlines the process for resolving any disputes that may arise.
Benefits of Using an MSA Buyer Contract:
Clear Expectations: Establishes a written record of the parties' intentions and obligations.
Risk Mitigation: Protects both parties from potential disputes and liabilities.
Legal Compliance: Ensures that the contract complies with applicable laws and regulations.
Enhanced Communication: Facilitates effective communication between the buyer and seller throughout the project.
Long-Term Stability: Provides a framework for a mutually beneficial and sustainable relationship.`,

    })

     this.tempelates.push({
      id: 7105,
      description: "This is for a nda contract ",
      contract_type: "Master NDA Workflow",
      Summary : `NDA Contract Summary
Purpose:
An NDA (Non-Disclosure Agreement) is a legal contract that protects confidential information shared between parties.
When to Use:
An NDA is typically used when:
Sensitive or proprietary information is being shared, such as trade secrets, financial data, or customer lists.
The parties involved have a business relationship and need to exchange confidential information to facilitate collaboration or transactions.
One party is providing services or products that require access to confidential information from the other party.
Key Provisions:
Definition of Confidential Information: Specifies the types of information that are considered confidential.
Obligation of Confidentiality: Requires the receiving party to keep the confidential information secret and only use it for the agreed-upon purpose.
Non-Use and Non-Disclosure: Prohibits the receiving party from using or disclosing the confidential information without the disclosing party's consent.
Exceptions: Outlines any exceptions to the confidentiality obligation, such as disclosures required by law or to protect the receiving party's own interests.
Term and Termination: Specifies the duration of the NDA and the conditions under which it can be terminated.
Remedies: Outlines the legal remedies available to the disclosing party in case of a breach of the NDA.
Benefits of Using an NDA:
Protects the disclosing party's confidential information from unauthorized disclosure or use.
Facilitates collaboration and business relationships by providing a framework for sharing sensitive information.
Helps prevent intellectual property theft and unfair competition.`,

    })

     this.tempelates.push({
      id: 7099,
      description: "This is an Employment Agreement Contract ",
      contract_type: "Employment agreement Workflow",
      Summary : `Employment Agreement Contract Summary
Purpose:
This contract establishes the terms and conditions of employment between an employer and an employee. It outlines the rights, responsibilities, and expectations of both parties.
When to Use:
This type of contract is typically used when:
The employee is hired for a specific period or project.
The employee is performing specialized or confidential work.
The employer wants to protect its intellectual property or trade secrets.
The employer needs to ensure compliance with labor laws and regulations.
Key Provisions:
Job Title and Description: Defines the employee's role and responsibilities.
Compensation and Benefits: Outlines the employee's salary, benefits, and other forms of compensation.
Work Hours and Location: Specifies the employee's work schedule and location.
Confidentiality and Non-Compete: Protects the employer's confidential information and prevents the employee from competing with the employer after termination.
Termination: Outlines the grounds for termination and the procedures for ending the employment relationship.
Dispute Resolution: Provides mechanisms for resolving disputes between the employer and employee.
Benefits of Using an Employment Agreement Contract:
Clarity and Protection: Provides a clear understanding of the terms of employment and protects both parties from misunderstandings or disputes.
Compliance: Ensures compliance with applicable labor laws and regulations.
Intellectual Property Protection: Protects the employer's confidential information and trade secrets.
Dispute Resolution: Facilitates the resolution of disputes in a fair and timely manner.`,

    })

    const tmpstring=JSON.stringify(this.tempelates)
    this.messages.push({
      role:"system",
      content: tmpstring+ ` these are the data for contract types with id,description and summary 
      now we need to ask the user questions about which type of contract the user wants to be created and based on the questions 
      you need to figure out which contract type is most suitable for the user we can ask multiple questions to figure this out , the user can say a type of contract which applies
       to multiple contract types for example msa can be for buyer as well as seller, in such situations ask more question to make the answer clear.
        if there are no contract types matched just say your workspace does not contain the required contract type.
         after comparing users answers with the summary of the contracts just tell the type of contract in the format -> [CHAT-ENDED] contract_type: [id] id will be the number associated with it and in brackets [], and append it with expression this will be the final ans
      and will tell us to start creating contract .
      start with asking exactly : what type of contract do you wish to create ?  `
    })


  }
  
  sendMessage() {
    if (this.newMessage.trim() === '') return;




    this.messages.push({
      role: 'user', // Assuming the user sends the message
      content: this.newMessage,
    });

    
    console.log(this.messages)
    const response_Message = this.getCompletion(this.messages) .subscribe((response) => {
      console.log("this is response",response)
        // Handle the AI response
       if (this.isPhrasePresent(response.content)){
          const id=this.extractIdFromMessage(response.content)
          console.log(id)
          if (id){

            this.messages.push({
                role:'assistant',
                content: "generating a contract type for you "
              })
          }else{
            this.messages.push({
                role:'assistant',
                content: "an error Occurred pls refresh and try "
              })
          }
       }
       else{
      this.messages.push({
                role:response.role,
                content:response.content
              })
       }
        

      });


    this.newMessage=''
  }
  

  getCompletion(messages: Message[]): Observable<Message> {
    const payload = {
      messages,
      model: "gpt-3.5-turbo", // Replace with your desired model
    };

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization:`Bearer`+ ,
    });

    return this.http.post<ChatCompletion>(this.baseUrl, payload, { headers })
      .pipe(
        map(data => {
         const choices = data?.choices;
          return choices[0].message

        
        }),
      
        catchError(error => {
          console.error('Error fetching AI response:', error);
          return throwError(() => new Error('Failed to get AI response'));
        })
      );
  }
  
   isPhrasePresent(text:string) {
    // Convert both text and phrase to lowercase for case-insensitive comparison
    const phrase="[CHAT-ENDED]"
    const lowerText = text.toLowerCase();
    const lowerPhrase = phrase.toLowerCase();
    
    // Check if the phrase is present in the text
    return lowerText.includes(lowerPhrase);
}

  clearMessage(){
     this.messages=[]
  }
 extractIdFromMessage(message:string) {
    // Define a regex pattern to match the ID format enclosed in brackets
    const idPattern = /\[(\d+)\]/;
    
    // Use the match method to find the ID in the message based on the pattern
    const match = message.match(idPattern);

    // Check if a match is found
    if (match) {
        // Return the ID extracted from the message
        return match[1];
    } else {
        // Return null if no match is found
        return null;
    }
}
}
