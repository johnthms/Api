import React,{Component} from "react";
import {View,Text,ActivityIndicator,Flatlist,Stylesheet} from 'react-native';
import axios from "axios";
import { getDrawerStatusFromState } from "@react-navigation/drawer";
export default class App extends Component{
  constructor()
  {
    super();
    this.state={
      loader:false,
      DATA:[]
    }
  }
  getData(){
    this.setState({loader:true})
    fetch('https://api.sampleapis.com/wines/reds')
    .then((response)=>response.json())
    .then((response)=>{
      if(response.length>0){
        this.setState({DATA:response})
      }
      this.setState({loader:false})
      console.log('your response is',response)
    })
    .catch((error)=>{
      this.setState({loader:false})
      console.log('error is',error)
    })
  }
  getAxiosData(){
    this.setState({loader:true})
    axios.get('https://api.sampleapis.com/wines/reds')
    .then((response)=>{
       this.setState({loader:false})
       console.log('AXIOS: RESPONSE',response)
    })
    .catch((error) =>{
      this.setState({loader:false})
      console.log('AXIOS :ERROR',error)
    })
  }
  componentDidMount(){
    this.getData()
  }
  render(){
    const renderItem=({item})=>(
      <View style={styles.itemcontainer}>
           <Text style={styles.itemtext}>{item.winery}</Text>
           <Text style={styles.itemdes}>{item.wine}</Text>
      </View>
    )
    return(
      <View>
        <ActivityIndicator size='large' color='purple' animating={this.state.loader}/>
        <Text
        onPress={()=> this.getAxiosData()}>Page containing winery  and wine</Text>
        <Flatlist style={{width:'95%',marginTop:10}}
        data={this.state.DATA}
        renderItem={renderItem}/>
      </View>
    )
  }
}
const styles=Stylesheet.create({
  itemcontainer:{
  innerWidth:'100%', 
  padding:10,
  backgroundColor:'#ffffff',
  elevation:4,
  marginBottom:10
  },
  itemtext:{
    fontSize:15,
    color:'bold',
    color:'purple'
  },
  itemdes:{
    fontSize:14,
    color:'#369',
    fontWeight:'bold',
    marginTop:10
  }
})