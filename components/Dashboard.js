import React, {
    Component
} from 'react';
import {
    FlatList,
    SafeAreaView,
    TouchableOpacity,
    View,
    Text,
    Modal,StyleSheet
} from 'react-native';

class Dashboard extends Component {
    constructor(props) {
        super(props)

        this.state = {
            modalVisibile:false,
            userDetails:[],
            dataArray: [{
                    name: "xyz",
                    id: "1",
                    title: "meeting at 9",
                    status: "complete"
                },
                {
                    name: "xyz",
                    id: "1",
                    title: "meeting at 9",
                    status: "complete"
                }

            ],
            dataArray1:[],
            userID: 0,
            title:'',




        };
    };

    componentDidMount(){
        this.getUserList();
    }
    getUserList() {
        fetch('https://jsonplaceholder.typicode.com/todos')
        .then(response => response.json())
        .then(data =>{ 
            console.log(data);
            this.setState({dataArray1:data})
        }
            );
    }
    getUserDetails(ID) {
        fetch(`https://jsonplaceholder.typicode.com/users/${ID}`)
        .then(response => response.json())
        .then(data =>{ 
            console.log(data);
            this.setState({userDetails:data,modalVisibile:true});
            
        }
            );
    }


    render() {
        return ( 
            <>
            <SafeAreaView>
            
            <View style={{flexDirection:'row', alignContent:'space-between'}}>
                <Text style={styles.textStyle} > Todos ID</Text>
                <Text  style={styles.textStyle}> Title</Text>
                <Text  style={styles.textStyle} > Status</Text>
                <Text  style={styles.textStyle} > Action</Text>

            </View>
        
                
            < FlatList data = {
                this.state.dataArray1}
            renderItem = {
                ({item,index}) => {
                    return (

                        <View style={{flexDirection:'row'}}>
                        < Text  style={styles.textStyle}> {  item.id  } </Text> 
                        <Text  style={styles.textStyle}> { item.title  } </Text> 
                        <Text  style={styles.textStyle}> {  item.completed==false?"Incomplete":"complete" } </Text>
                         <TouchableOpacity
                         onPress={()=>{
                      this.getUserDetails(item.userId);

                      this.setState({userID:item.id,title:item.title})
                         }}
                         >
                        <Text> View User </Text>

                        </TouchableOpacity>


                        </View>
                    )
                }

            }
            />  
</SafeAreaView>
<Modal
  visible={this.state.modalVisibile}
//   visible={true}

  transparent={true}
>
<>
<SafeAreaView style={{backgroundColor:'white',flex:1,}}>
  <View style={{flexDirection:'row'}}>
  <View> 
              <Text>TODO ID</Text>
              <Text>TODO Title</Text>
              <Text>ID </Text>


              <Text> NAME</Text>
              <Text> EMAIL</Text>

          </View>
          <View>
          <Text style={styles.textStyle1}>{this.state.userID}</Text>
          <Text style={styles.textStyle1}>{this.state.title}</Text>

              <Text style={styles.textStyle1}>{this.state.userDetails.id}</Text>
              <Text style={styles.textStyle1}>{this.state.userDetails.name}</Text>
              <Text style={styles.textStyle1}>{this.state.userDetails.email}</Text>

          </View>
  </View>
          

        
                        
                
        
{/* 
                    <Text style={styles.textStyle} >{this.state.userDetails.id}</Text>
                    <Text style={styles.textStyle} > {this.state.userDetails.username}</Text>
                    <Text style={styles.textStyle} >{this.state.userDetails.email}</Text> */}
    
   


<TouchableOpacity
             style={{width:"30%",height:20,alignSelf:'center',marginVertical:40,backgroundColor:'grey'}}
             onPress={()=>{
                 this.setState({modalVisibile:false});
             }}
            >
                <Text style={{alignSelf:'center'}}>OK</Text>
            </TouchableOpacity>
            </SafeAreaView>
</>
</Modal>
            </>
        );
    }
}

const styles=StyleSheet.create({
    textStyle:{
       marginLeft:20,
       width:'20%'
    },
    textStyle1:{
        marginLeft:20,
        
     }
})

export default Dashboard;