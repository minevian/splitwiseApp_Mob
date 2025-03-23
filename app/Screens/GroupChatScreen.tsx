import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, ScrollView, TouchableOpacity, Alert, Image } from 'react-native';
import { Link, useLocalSearchParams } from 'expo-router';
import { fetchGroupsById, handleExpenseDetails } from '../services/ApiUserServices';

import { Card, Menu, TextInput, PaperProvider, Button, IconButton, Dialog } from 'react-native-paper';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import EvilIcons from '@expo/vector-icons/EvilIcons';

const GroupChatScreen = () => {

  const params = useLocalSearchParams();

  const [groupDetails, setGroupDetails] = useState<any>(null);
  const [dialogueVisible, setdialogueVisible] = useState(false);

  const [expenses, setExpenses] = useState([
    { member: '', category: '', customCategory: '', amount: '' }
  ]);

  const categories = ['Food', 'Transport', 'Shopping', 'Entertainment', 'Other'];

  useEffect(() => {
    const getGroupDetailByID = async () => {
      const groupId = Array.isArray(params?.groupId) ? params.groupId[0] : params.groupId;

      if (groupId) {
        const getGroupDetail = await fetchGroupsById(groupId);
        if (getGroupDetail.success) {
          const groupData = getGroupDetail.group;
          setGroupDetails(groupData);
        }
      }
    };

    getGroupDetailByID();
  }, []);

  const handleAddExpense = () => {
    setExpenses([...expenses, { member: '', category: '', customCategory: '', amount: '' }]);
  };

  const handleRemoveExpense = (index: number) => {
    const newExpenses = [...expenses];
    newExpenses.splice(index, 1);
    setExpenses(newExpenses);
  };

  const handleExpenseChange = (index: number, field: keyof typeof expenses[0], value: string) => {
    const updatedExpenses = [...expenses];
    updatedExpenses[index][field] = value;
    setExpenses(updatedExpenses);
  };


  const handleSubmit = async () => {
    const groupId = Array.isArray(params?.groupId) ? params.groupId[0] : params.groupId;

    try {

      for (let expense of expenses) {
        if (!expense.member || !expense.category || !expense.amount) {
          Alert.alert('Invalid Expense', 'Please fill out all fields for each expense.');
          return;
        }
      }

      const expenseRequests = expenses.map(expense => {
        const requestData = {
          groupId: groupId,
          amount: parseFloat(expense.amount),
          description: expense.category === 'Other' ? expense.customCategory : expense.category,
          paidBy: expense.member,
        };

        return handleExpenseDetails(requestData);
      });

      const responses = await Promise.all(expenseRequests);

      const allSuccess = responses.every(resp => resp.success === true);

      if (allSuccess) {
        Alert.alert('Expenses Added', 'Your expenses have been added successfully!');
        const getGroupDetail = await fetchGroupsById(groupId);
        if (getGroupDetail.success) {
          const groupData = getGroupDetail.group;
          console.log('ExpenseDetails', groupData)
          setGroupDetails(groupData);
         
        }

        setExpenses([{ member: '', category: '', customCategory: '', amount: '' }]);
      } else {

        const errorMessage = responses.find(resp => resp.success !== true)?.message || 'Some expenses failed to add';
        Alert.alert('Error', errorMessage);
      }
    } catch (error) {
      console.error('Error adding expense:', error);
      Alert.alert('Error', 'There was an error adding your expenses.');
    }
  };

  const hideDialog = () => setdialogueVisible(false);

  return (
    <PaperProvider>
      <ScrollView style={styles.container}>
        <Link href='/(home)/home' style={styles.backLink}>Back</Link>

        {groupDetails ? (
          <View style={styles.groupInfo}>
            <Text style={styles.groupName}>{groupDetails?.groupName}</Text>

            {expenses.map((expense, index) => (
              <Card key={index} style={styles.card}>
                <Card.Content>
                  <Text style={styles.cardTitle}>Expense {index + 1}</Text>

                  {/* Remove Expense Button on the right side */}
                  {expenses.length > 1 && (
                    <IconButton
                      icon="delete"
                      size={20}
                      onPress={() => handleRemoveExpense(index)}
                      style={{ position: 'absolute', right: 10, top: 10 }}
                    />
                  )}

                  {/* Member Selection */}
                  <Menu
                    visible={expense.member !== ''}
                    onDismiss={() => handleExpenseChange(index, 'member', '')}
                    anchor={
                      <Button style={{ marginTop: 5 }}
                        mode="outlined"
                        onPress={() => handleExpenseChange(index, 'member', expense.member ? '' : 'open')}
                      >
                        {expense.member || 'Select Member'}
                      </Button>
                    }
                  >
                    {groupDetails.members.map((member: any, i: number) => (
                      <Menu.Item
                        key={i}
                        title={member.userName}
                        onPress={() => handleExpenseChange(index, 'member', member.userName)}
                      />
                    ))}
                  </Menu>

                  {/* Category Selection */}
                  <Menu
                    visible={expense.category !== ''}
                    onDismiss={() => handleExpenseChange(index, 'category', '')}
                    anchor={
                      <Button style={{ marginTop: 5 }}
                        mode="outlined"
                        onPress={() => handleExpenseChange(index, 'category', expense.category ? '' : 'open')}
                      >
                        {expense.category || 'Select Category'}
                      </Button>
                    }
                  >
                    {categories.map((cat, i) => (
                      <Menu.Item
                        key={i}
                        title={cat}
                        onPress={() => handleExpenseChange(index, 'category', cat)}
                      />
                    ))}
                  </Menu>

                  {/* Custom Category */}
                  {expense.category === 'Other' && (
                    <TextInput
                      mode="outlined"
                      style={styles.textBox}
                      label="Custom Category"
                      value={expense.customCategory}
                      onChangeText={(value) => handleExpenseChange(index, 'customCategory', value)}
                      placeholder="Enter custom category"
                    />
                  )}

                  {/* Expense Amount */}
                  <TextInput
                    mode="outlined"
                    style={styles.textBox}
                    label="Amount"
                    value={expense.amount}
                    onChangeText={(value) => handleExpenseChange(index, 'amount', value)}
                    placeholder="Enter amount"
                    keyboardType="numeric"
                  />
                </Card.Content>
              </Card>
            ))}


            <View style={styles.btnContainer}>

              <Button mode="outlined"
                onPress={handleAddExpense}
                labelStyle={{ color: '#083189' }} elevation={5} style={styles.addButton}>
                + Add Member
              </Button>

              <Button mode="contained"
                labelStyle={{ color: '#f5f5f5' }} onPress={handleSubmit} style={styles.submitButton}>
                Submit
              </Button>
            </View>



          </View>
        ) : (
          <View style={styles.loadingContainer}>
            <Image source={require('../../assets/images/loadingVdoScreen.gif')} style={styles.loadingGif} /></View>
        )}
      </ScrollView>

      <Dialog visible={dialogueVisible} onDismiss={hideDialog} style={styles.dialogueBox}>
  <Dialog.Content style={styles.dialogueBox}>
    {groupDetails ? (
      <View>
        {/* Header Section */}
        <View style={styles.textCloseContainer}>
          <Text style={styles.modalTitle}>Settlement Details</Text>
          <EvilIcons 
            onPress={() => setdialogueVisible(false)} 
            name="close-o" 
            size={30} 
            color="red" 
          />
        </View>

        {/* Settlement Details */}
        {groupDetails.settlements && groupDetails.settlements.length > 0 ? (
          groupDetails.settlements.map((settlement: any, index: any) => (
            <View key={index} style={styles.settlementItem}>
              
              {/* From Section */}
              <View style={styles.rowContainer}>
                <Image source={require('../../assets/images/OweCats.png')} style={styles.icon} />
                <Text style={styles.boldText}>{settlement.from}</Text>
              </View>

              <Text style={styles.payText}>Has To Pay →</Text>

              {/* Amount and To Section */}
              <View style={styles.rowContainer}>
                <Text style={styles.amountText}>
                  ₹ {parseFloat(settlement.amount).toLocaleString()}
                </Text>
                <Text style={styles.toText}>to</Text>
                <Text style={styles.boldText}>{settlement.to}</Text>
                <Image source={require('../../assets/images/GainCat.png')} style={styles.icon} />
              </View>

            </View>
          ))
        ) : (
          <Text style={styles.noSettlementText}>No settlement details available.</Text>
        )}
      </View>
    ) : (
      <View style={styles.loadingContainer}>
        <Image source={require('../../assets/images/loadingVdoScreen.gif')} style={styles.loadingGif} />
      </View>
    )}
  </Dialog.Content>
</Dialog>



      <View style={styles.footer} >
        <TouchableOpacity onPress={() => { setdialogueVisible(true) }}>

          <MaterialIcons name="attach-money" size={24} color="black" />
          <Text style={styles.footerText}>Settle Up</Text>
        </TouchableOpacity>
      </View>
    </PaperProvider>
  );
};

export default GroupChatScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  backLink: {
    fontSize: 16,
    color: '#007BFF',
    marginBottom: 10,
  },
  groupInfo: {
    marginTop: 10,
  },
  groupName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  card: {
    backgroundColor: '#fff',
    marginVertical: 10,
    borderRadius: 10,
    padding: 10,
    elevation: 2,
  },
  textBox: {
    backgroundColor: '#fff',
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  removeButton: {
    alignSelf: 'flex-end',
    marginTop: -40,
    marginRight: -10,
  },
  addButton: {
    marginTop: 10,
    paddingTop: 5

  },
  submitButton: {
    marginTop: 20,
    backgroundColor: '#083189',
  },
  loading: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 20,
  },
  menu: {
    top: 5,
    marginTop: 5
  },
  removeBtn: {
    width: 100,
    height: 30,
    justifyContent: 'flex-end',
    right: 0,
    bottom: 5

  },
  btnContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  footer: {
    height: 60,
    backgroundColor: '#08306b',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  footerText: {
    color: '#000',
    fontSize: 18,
    marginLeft: 10,
  },

  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingGif: {
    width: 500,
    height: 500,
    alignContent:'center',
    justifyContent:'center'
  },
  dialogueBox: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
  },
  textCloseContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  settlementItem: {
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  icon: {
    width: 30,
    height: 30,
    marginRight: 10,
  },
  boldText: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#333',
  },
  payText: {
    fontSize: 14,
    color: '#555',
    marginVertical: 5,
  },
  amountText: {
    fontSize: 18,
    color: '#28a745',
    fontWeight: 'bold',
    marginRight: 5,
  },
  toText: {
    fontSize: 14,
    color: '#555',
    marginHorizontal: 5,
  },
  noSettlementText: {
    fontSize: 14,
    color: '#777',
    textAlign: 'center',
  },
 
});
