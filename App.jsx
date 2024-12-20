import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import { useState } from 'react';


// async function tes(prompt) {
//   const { GoogleGenerativeAI } = require("@google/generative-ai");
//   const genAI = new GoogleGenerativeAI("AIzaSyCXKvV1xYawFODBSY2lnqNJdSnZBPKy9B4");
//   const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
//   const result = await model.generateContent(prompt);
//   console.log(result.response.text());
//   return result.response.text();
// }

// export default function App() {
//   const [prompt, setPrompt] = useState(""); // State for input text
//   const [response, setResponse] = useState(""); // State for API response

//   const getResponse = async () => {
//     const result = await tes(prompt);
//     setResponse(result);
//   };

//   return (
//     <View style={styles.container}>
//       <Text>Ask a question:</Text>

//       {/* Text Input for user prompt */}
//       <TextInput
//         style={styles.input}
//         placeholder="Type your question here"
//         value={prompt}
//         onChangeText={setPrompt}
//       />

//       {/* Button to trigger response */}
//       <Button title="Get Response" onPress={getResponse} />

//       {/* Display API Response */}
//       <Text style={styles.responseText}>{response}</Text>

//       <StatusBar style="auto" />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//     padding: 16,
//   },
//   input: {
//     borderWidth: 1,
//     borderColor: '#ccc',
//     padding: 10,
//     marginVertical: 10,
//     width: '100%',
//     borderRadius: 5,
//   },
//   responseText: {
//     marginTop: 20,
//     fontSize: 16,
//     color: 'blue',
//   },
// });


import React from 'react';
import AppNavigator from './navigation/AppNavigator';

export default function App() {
  // return (<Text>test</Text>);
  return <AppNavigator />;
}
