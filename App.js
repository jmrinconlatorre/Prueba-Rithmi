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

	orderByData(obj) {
		let objFinal = [];
		let found = false;
		let j;

		for (let i = 0; i < obj.length; i++) {
			let date = new Date(obj[i].date);
			let year = date.getFullYear();
			let day = date.getDate();
			let month = date.getMonth();
			let dayOfWeek = date.getDay();
			let dateOrdered = year + '/' + month + '/' + day;
			let anomalyType;

			let heartRate = '   ' + obj[i].heartRate.toString() + ' ppm ';			
			if(obj[i].hasAnomaly){
				anomalyType = ' - Anomalía detectada - ';
			}
			else{
				anomalyType = ' - Pulso normal -';
			}
			
			let arrayAux = [ date.toLocaleTimeString(), heartRate, anomalyType ];

			for (j = 0, found = false; j < objFinal.length && !found; j++) {
				if (objFinal[j].dateOrderBy === dateOrdered) {
					objFinal[j].data.push(arrayAux);
					objFinal[j].data.sort();
					found = true;
				}
			}

			if (j === objFinal.length) {
				objFinal.push({
					date: this.getSpanishDay(dayOfWeek) + ' ' + day + ' de ' + this.getSpanishMonth(month),
					data: [ arrayAux ],
					dateOrderBy: dateOrdered
				});
			}
		}

		objFinal.sort((a, b) => {
			if (a.dateOrderBy > b.dateOrderBy) {
				return 1;
			}
			if (a.dateOrderBy < b.dateOrderBy) {
				return -1;
			}
			return 0;
		});

		return objFinal;
	}

	getSpanishDay(dayOfWeek) {
		let day;

		switch (dayOfWeek) {
			case 1:
				day = 'Lunes';
				break;
			case 2:
				day = 'Martes';
				break;
			case 3:
				day = 'Miércoles';
				break;
			case 4:
				day = 'Jueves';
				break;
			case 5:
				day = 'Viernes';
				break;
			case 6:
				day = 'Sábado';
				break;
			case 0:
				day = 'Domingo';
				break;
		}

		return day;
	}

	getSpanishMonth(day) {
		let month;

		switch (day) {
			case 0:
				month = 'enero';
				break;
			case 1:
				month = 'febrero';
				break;
			case 2:
				month = 'marzo';
				break;
			case 3:
				month = 'abril';
				break;
			case 4:
				month = 'mayo';
				break;
			case 5:
				month = 'junio';
				break;
			case 6:
				month = 'julio';
				break;
			case 7:
				month = 'agosto';
				break;
			case 8:
				month = 'septiembre';
				break;
			case 9:
				month = 'octubre';
				break;
			case 10:
				month = 'noviembre';
				break;
			case 11:
				month = 'diciembre';
				break;
		}

		return month;
	}

	async getDataFromApiAsync() {
		try {
			let response = await fetch(this.state.endPoint);
			let jsonObj = await response.json();

			this.setState({
				dato: this.orderByData(jsonObj),
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
