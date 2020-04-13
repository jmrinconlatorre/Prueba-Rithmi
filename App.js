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
			data: [],
			endPoint: 'https://rithmi-frontend-test.s3-eu-west-1.amazonaws.com/samples.json'
		};

		this.getDataFromApiAsync = this.getDataFromApiAsync.bind(this);
	}

	componentDidMount() {
		this.getDataFromApiAsync();		
	}

	async getDataFromApiAsync() {
		try {
			let response = await fetch(this.state.endPoint);
			let json = await response.json();

			this.setState({
				data: json,
				loading: false
			});
		} catch (error) {
			console.error(error);
		}
	}

	render() {
		const { data, loading } = this.state;

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
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#2980b9',
		justifyContent: 'center'
	},
	text: {
		fontSize: 40,
		color: '#FFF',
		fontWeight: 'bold'
	},
	item: {
		backgroundColor: '#f9c2ff',
		padding: 20,
		marginVertical: 8
	},
	header: {
		fontSize: 32,
		backgroundColor: '#000'
	},
	title: {
		fontSize: 24
	}
});

export default App;
