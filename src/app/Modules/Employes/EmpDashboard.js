import React, { useState, useEffect } from "react";
import { FlatList, SafeAreaView, Text,StyleSheet, StatusBar,View, TouchableOpacity, Image,Dimensions, TextInput } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';

const { height, width } = Dimensions.get('screen');

const EmpDashboard = ({navigation}) => {

    const [employeeData, setemployeeData] = useState([]);
    const [query, setQuery] = useState('');
    const [empty, setEmpty] = useState(false);

    useEffect(() => {
        getValues('EmployeeList').then((res) => {
            // console.log('response' + res)
            if (res === null) {
                let serviceURL = 'http://www.mocky.io/v2/5d565297300000680030a986'
                let requestBody = {
                    method: 'GET',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json'
                    },
                }
                fetch(serviceURL, requestBody)
                    .then((response) => response.json())
                    .then((json) =>
                        saveValue('EmployeeList', JSON.stringify(json))
                    )
                    .catch((error) => console.error(error))
            }
            else{
                setemployeeData(res);
            }
        })
    }, [empty])

    async function saveValue(inputKey, inputValue) {
        await AsyncStorage.setItem(inputKey, inputValue);
        setemployeeData(JSON.parse(inputValue));
    }

    async function getValues(inputKey) {
        var promise = new Promise(function (resolve, reject) {
            AsyncStorage.getItem(inputKey, (error, result) => {
                // console.log('res' + result)
                if (result !== null) {
                    let employees = JSON.parse(result);
                    resolve(employees);
                }
                else {
                    resolve(null);
                }

            });
        });
        return promise;
    }

    const handleSearch = text => {
        let employees = employeeData
        let employeeValue = employeeData
        let filteredName = employees.filter((item) => {
            return item.name.toLowerCase().match(text)
        })
        setQuery(text)
        // console.log(text.length + employees)
        if (!text || text === '') {
            // alert('No data found')
            // setemployeeData([])
            setEmpty(true)
            setemployeeData(employeeValue)
            
          } else if (!Array.isArray(filteredName) && !filteredName.length) {
            setEmpty(true)
            setemployeeData(employeeValue)
            alert('No data found')
          } else if (Array.isArray(filteredName)) {
                setemployeeData(filteredName)
          }
    };
 
    return (
        <SafeAreaView style={styles.topContainer}>
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.headerText}>EmployeeList</Text>
                </View>
                <TextInput
                    autoCapitalize="none"
                    autoCorrect={false}
                    clearButtonMode="always"
                    value={query}
                    onChangeText={queryText => handleSearch(queryText)}
                    placeholder="Search"
                    style={{ backgroundColor: '#fff', paddingHorizontal: 20 }}
                />
            <FlatList
                data={employeeData}
                renderItem={({ item }) => 
                <TouchableOpacity style={styles.item} onPress={() => navigation.navigate('DashboardDetail',{item:item})}>
                    <View>
                        <Image source={{uri:item.profile_image}}style={{width:60, height:60,borderRadius:30}}/>
                    </View>
                    <View>
                        <Text style={styles.title}>{item.name}</Text>
                        {
                            item.company !== null
                            &&
                            <Text style={styles.title}>{item.company.name}</Text>
                        }
                    </View>
                </TouchableOpacity>
            }
                keyExtractor={item => item.id}
            />
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        height: height,
    },
    topContainer:{
        flex: 1,
    },
    header: {
        backgroundColor: '#2a66c7',
        padding: 20,
        elevation:2,
    },
    headerText: {
        textAlign: 'center',
        color: '#fff',
        fontWeight: 'bold',
    },
    item: {
        // backgroundColor: '#f9c2ff',
        padding: 20,
        flexDirection:'row',
        justifyContent:'flex-start',
        borderWidth: 1, 
        borderColor: '#ccc'
    },
    title: {
        fontSize: 14,
        color:'#000',
        paddingLeft:15,
        paddingTop:5
    },
});

export default EmpDashboard;
