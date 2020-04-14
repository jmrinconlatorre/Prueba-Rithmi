/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { Component } from 'react';
import { StyleSheet, View, Text, SectionList, SafeAreaView } from 'react-native';

class App extends Component {
	constructor(props) {
		super(props);

		this.state = {
			loading: false,
			dato: [],
			endPoint: 'https://rithmi-frontend-test.s3-eu-west-1.amazonaws.com/samples.json'
		};

		this.getDataFromApiAsync = this.getDataFromApiAsync.bind(this);
	}

	componentDidMount() {
		this.getDataFromApiAsync();
	}

	orderByDate(obj) {
		let objFinal = [];
		let found = false;

		for (let i = 0; i < obj.length; i++) {
			let date = new Date(obj[i].date);

			let heartRate = ' ' + obj[i].heartRate.toString();
			let hasAnomaly = ' ' + obj[i].hasAnomaly.toString();

			let objAux = [ date.toLocaleTimeString(), heartRate, hasAnomaly ];

			for (let j = 0, found = false; j < objFinal.length && !found; j++) {
				if (objFinal[j].date === date.toLocaleDateString()) {
					objFinal[j].data.push(objAux);

					found = true;
				}
			}

			if (!found) {
				objFinal.push({
					date: date.toLocaleDateString(),
					data: [ objAux ]
				});
			}
		}

		return objFinal;
	}

	async getDataFromApiAsync() {
		try {
			let response = await fetch(this.state.endPoint);
			let jsonObj = await response.json();

			this.setState({
				dato: this.orderByDate(jsonObj),
				loading: false
			});
		} catch (error) {
			console.error(error);
		}
	}

	render() {
		const { dato, loading } = this.state;

		if (loading) {
			return (
				<View style={styles.container}>
					<Text>Connecting</Text>
				</View>
			);
		}

		return (
			<View style={styles.container}>
				<Text style={styles.text}>Listado de frecuencias </Text>

				<SafeAreaView style={styles.container}>
					<SectionList
						sections={dato}
						renderItem={({ item }) => <Text style={styles.item}>{item}</Text>}
						renderSectionHeader={({ section }) => <Text style={styles.header}>{section.date}</Text>}
					/>
				</SafeAreaView>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	text: {
		fontSize: 40,
		color: '#182C61',
		fontWeight: 'bold'
	},
	container: {
		flex: 1,
		marginTop: 20,
		marginHorizontal: 16
	},
	item: {
		backgroundColor: '#1B9CFC',
		padding: 20,
		marginVertical: 8,
		color: '#2C3A47'
	},
	header: {
		fontSize: 32,
		backgroundColor: '#fff'
	},
	title: {
		fontSize: 24
	}
});

export default App;
