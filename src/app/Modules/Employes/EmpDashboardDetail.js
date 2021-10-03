import React, {} from "react";
import {SafeAreaView, Text,StyleSheet, StatusBar,View, Image } from "react-native";

const EmpDashboardDetail = ({ route, navigation }) =>{
    const { item } = route.params;
    return(
        <SafeAreaView style={styles.container}>
            <View style={styles.imageView}>
            <Image source={{uri:item.profile_image}}style={{width:150, height:150,borderRadius:50}}/>
            </View>
            <View style={styles.detailView}>
                <Text style={styles.textValue}><Text style={styles.textLabel}>Name :</Text> {item.name}</Text>
                <Text style={styles.textValue}><Text style={styles.textLabel}>Email :</Text> {item.email}</Text>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={styles.textLabel}>Address :</Text>
                    <Text style={styles.textValue}> {item.address.street} {"\n"} {item.address.suite}
                        {"\n"} {item.address.city}
                        {"\n"} {item.address.zipcode}
                    </Text>
                </View>
                {
                    item.phone
                    ?
                    <Text style={styles.textValue}><Text style={styles.textLabel}>Phone :</Text> {item.phone}</Text>
                    :null
                }
                <Text style={styles.textValue}><Text style={styles.textLabel}>Website :</Text> {item.website}</Text>
                {
                    item.company !== null
                    &&
                    <View style={{ flexDirection: 'row',alignItems:'center',justifyContent:'space-evenly',paddingLeft:50 }}>
                        <Text style={styles.textLabel}>Company :</Text>
                        <Text style={[styles.textValue,{paddingLeft:30}]}> {item.company.name} {"\n"} {item.company.catchPhrase}
                            {"\n"} {item.company.bs}
                        </Text>
                    </View>
                }
            </View>
           
        </SafeAreaView>
    )
}

export default EmpDashboardDetail;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: StatusBar.currentHeight || 0,
    },
    imageView:{
        justifyContent:'center',
        alignItems:'center'
    },
    detailView:{
        flex:1,
        alignItems:'center',
        paddingTop:50
    },
    textLabel:{
        fontSize:18,
        fontWeight:'bold',
        color:'#000',
        padding:10
    },
    textValue:{
        fontSize:18,
        color:'#000',
        padding:10
    }
});