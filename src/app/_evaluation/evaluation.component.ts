import { AfterContentInit, Component, OnInit } from '@angular/core';
import {TestService} from '../test.service';
import { ActivatedRoute, Router } from '@angular/router';
import { information  } from '../Models/informationformation'  ;
class participant {
  "name": string;
  "participantid":number;
  "etat": string;
  "dmaj": string;
  "formationid":number;
}
class formations {
  "done": boolean;
  "title":string;
  "date": string;
  "nombreparticipant": number;
  "formationid":number;
}



@Component({
  selector: 'app-evaluation',
  templateUrl: './evaluation.component.html',
  styleUrls: ['./evaluation.component.scss']
})
export class EvaluationComponent implements OnInit {
  public participants:participant[]=[];
  title ="";
  date="";
  nbrp=0;
  
  public participantid:any;
  constructor(private Testservice:TestService,public route:ActivatedRoute,private router:Router) { }
 
  ngOnInit(): void {
    let id = this.route.snapshot.paramMap.get('id');
    this.participantid=id;
    this.getcardinfo();
    this.fetchparticipant();
  }

  getcardinfo(){
    this.Testservice.getOneFormation(this.participantid).subscribe((data:any)=>{
      console.log(data);
      this.title=data.title;
      this.date=data.date;
      this.nbrp=data.nombreparticipant;
      console.log("data formation received succesfullly");
  })
}
  fetchparticipant(){
    this.Testservice.getParticipant(this.participantid).subscribe((data:any)=>{
      console.log(data);
      this.participants=data;
      console.log("data participant received succesfullly");
  })
  }
  // set done and commentary data
  technique="";
  comportemental="";
  info=new information();
  setEvaluationtodone(){
    this.info.comtechnique=this.technique;
    this.info.comcomportemental=this.comportemental;
    console.log(this.info)
    this.Testservice.evaluationTerminer(this.participantid,this.info).subscribe(()=>{
      console.log("update done formation evaluer !!");
    })
  }
  /*participants:participant[]=[
    {"name":"foulen ben foulen" ,"identifiant": 741852 , "dmaj":"12 mars 1999" , "etat":"non ??valuer" },
    {  "name":"patrique pastel" ,"identifiant": 954126 , "dmaj":"12 mars 1999" , "etat":"non ??valuer" },
    {  "name":"roberto regro" ,"identifiant": 954126 , "dmaj":"12 mars 1999" , "etat":"??valuer" },
    {  "name":"rafayel rocher" ,"identifiant": 954126 , "dmaj":"12 mars 1999" , "etat":"??valuer"  },
    {"name":"foulen ben foulen" ,"identifiant": 741852 , "dmaj":"12 mars 1999" , "etat":"??valuer" },
    {  "name":"patrique pastel" ,"identifiant": 954126 , "dmaj":"12 mars 1999" , "etat":"non ??valuer" },
    {  "name":"roberto regro" ,"identifiant": 954126 , "dmaj":"12 mars 1999" , "etat":"??valuer" },
    {  "name":"rafayel rocher" ,"identifiant": 954126 , "dmaj":"12 mars 1999" , "etat":"??valuer"  }
  ]*/
public evaluation(){
let i=0;
let json=JSON.parse( JSON.stringify(this.participants)  , (k,v)=>{
    if(k === "etat"){
      if(v ==="??valuer"){
        i+=1;
      }
    }
  })
  return i ;
}


public sendEvaluation(){

  if((this.evaluation()===this.participants.length)&&(this.participants.length!==0)){
    console.log("not working");
    this.setEvaluationtodone();
    this.router.navigate(['/','formateur','mesformations']);
  }
}
}
