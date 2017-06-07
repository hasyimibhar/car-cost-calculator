var chart = null;

var app = new Vue({
	el: '#content',
	data: {
		monthlyRepayment: 500,
		insurancePrice: 800,
		roadTaxPrice: 90,
		distancePerMonth: 2500,
		averageFuelEfficiency: 9.5,
		fuelPrice: 2.1,
		minorServiceFrequency: 5000,
		minorServiceCost: 200,
		majorServiceFrequency: 60000,
		majorServiceCost: 1200,
		batteryLife: 2,
		batteryCost: 350,
		tireLife: 5,
		tireCost: 300,
	},
	mounted: function () {
		var currency = this.currency;
		chart = c3.generate({
			size: {
		        height: 500,
		        width: 500
		    },
		    data: {
		        // iris data from R
		        columns: [
		            ['Monthly Repayment', this.monthlyRepayment],
		            ['Insurance & Road Tax', this.insuranceRoadTaxCostPerMonth],
		            ['Fuel', this.fuelCostPerMonth],
		            ['Maintenance', this.maintenanceCostPerMonth],
		        ],
		        type : 'donut',
		    },
		    donut: {
		    	title: 'Monthly Cost',
		        label: {
		            format: function (value, ratio, id) {
		                return 'RM' + currency(value, 2);
		            }
		        }
		    }
		});
	},
	computed: {
		fuelCostPerMonth: function() {
			return (this.distancePerMonth / 100.0) * this.averageFuelEfficiency * this.fuelPrice;
		},
		fuelCostPerKm: function() {
			return (this.averageFuelEfficiency * this.fuelPrice) / 100.0;
		},
		maintenanceCostPerMonth: function() {
			var minorService = this.minorServiceCost / (this.minorServiceFrequency / this.distancePerMonth);
			var majorService = this.majorServiceCost / (this.majorServiceFrequency / this.distancePerMonth);
			var battery = this.batteryCost / (this.batteryLife * 12);
			var tire = (this.tireCost * 4) / (this.tireLife * 12);

			return minorService + majorService + battery + tire;
		},
		maintenanceCostPerKm: function() {
			var minorService = this.minorServiceCost / this.minorServiceFrequency;
			var majorService = this.majorServiceCost / this.majorServiceFrequency;
			var battery = this.batteryCost / (this.batteryLife * 12 * this.distancePerMonth);
			var tire = (this.tireCost * 4) / (this.tireLife * 12 * this.distancePerMonth);

			return minorService + majorService + battery + tire;
		},
		insuranceRoadTaxCostPerMonth: function() {
			return (this.insurancePrice + this.roadTaxPrice) / 12;
		},
		totalCostPerKm: function() {
			return this.fuelCostPerKm + this.maintenanceCostPerKm;
		},
		totalCostPerMonth: function() {
			return this.monthlyRepayment + this.fuelCostPerMonth + this.maintenanceCostPerMonth + this.insuranceRoadTaxCostPerMonth;
		},
		totalExpensePerMonth: function() {
			return this.monthlyRepayment + this.fuelCostPerMonth;
		},
		totalSavingPerMonth: function() {
			return this.maintenanceCostPerMonth + this.insuranceRoadTaxCostPerMonth;
		},
	},
	methods: {
		currency: function (value, n) {
			return this.numberWithCommas(Number(value).toFixed(n));
		},
		numberWithCommas: function (x) {
		    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
		},
		reloadChart: function() {
			chart.load({
		        columns: [
		            ['Monthly Repayment', this.monthlyRepayment],
		            ['Insurance & Road Tax', this.insuranceRoadTaxCostPerMonth],
		            ['Fuel', this.fuelCostPerMonth],
		            ['Maintenance', this.maintenanceCostPerMonth],
		        ],
		    });
		},
	},
	watch: {
		monthlyRepayment: function (value) {
			this.reloadChart();
		},
		insurancePrice: function (value) {
			this.reloadChart();
		},
		roadTaxPrice: function (value) {
			this.reloadChart();
		},
		distancePerMonth: function (value) {
			this.reloadChart();
		},
		averageFuelEfficiency: function (value) {
			this.reloadChart();
		},
		fuelPrice: function (value) {
			this.reloadChart();
		},
		minorServiceFrequency: function (value) {
			this.reloadChart();
		},
		minorServiceCost: function (value) {
			this.reloadChart();
		},
		majorServiceFrequency: function (value) {
			this.reloadChart();
		},
		majorServiceCost: function (value) {
			this.reloadChart();
		},
		batteryLife: function (value) {
			this.reloadChart();
		},
		batteryCost: function (value) {
			this.reloadChart();
		},
		tireLife: function (value) {
			this.reloadChart();
		},
		tireCost: function (value) {
			this.reloadChart();
		},
	},
})