import Chart from 'chart.js/auto'
import { benfordFrequencies } from '../benfordTools/statisticalTests.js';
import { benfordObject } from '../benfordTools/statisticalTests.js';

const myBenfordObject = benfordObject(benfordFrequencies());

const myDataTab = Object.keys(myBenfordObject).map((cle) => ({
    cle: cle,
    valeur: myBenfordObject[cle] * 100,
}));

(async function () {

    const myData = myDataTab;

    new Chart(
        document.getElementById('benfordCharts'),
        {
            type: 'bar',
            options: {
                animation: false,
                plugins: {
                    legend: {
                        display: true
                    },
                    tooltip: {
                        enabled: true
                    }
                }
            },
            data: {
                labels: myData.map(row => row.cle),
                datasets: [
                    {
                        label: 'Fréquence en % ',
                        data: myData.map(row => row.valeur),
                        backgroundColor: 'rgba(255, 99, 132, 0.2)',
                        borderColor: [
                            'rgb(255, 99, 132)'
                        ],
                        borderWidth: 1
                    }

                ]
            },
            options: {
                indexAxis: 'y',
                responsive: true,
                plugins: {
                    legend: {
                        position: 'top',
                    },
                    title: {
                        display: true,
                        text: 'Fréquence d\'apparition du premier chiffre significatif selon la loi de Benford'
                    }
                }
            }

        }
    );
})();
