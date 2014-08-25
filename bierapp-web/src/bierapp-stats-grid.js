/*
 * Copyright (c) 2014 Francisco Salavert (SGL-CIPF)
 * Copyright (c) 2014 Alejandro Alemán (SGL-CIPF)
 * Copyright (c) 2014 Ignacio Medina (EBI-EMBL)
 *
 * This file is part of JSorolla.
 *
 * JSorolla is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 2 of the License, or
 * (at your option) any later version.
 *
 * JSorolla is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with JSorolla. If not, see <http://www.gnu.org/licenses/>.
 */
function BierAppStatsGrid(args) {
    _.extend(this, Backbone.Events);
    this.id = Utils.genId("BierAppStatsGrid");

    this.target;
    this.autoRender = true;
    this.storeConfig = {};
    this.gridConfig = {};
    this.height;
    this.stats = {};
    this.headerConfig;

    _.extend(this, args);

    this.on(this.handlers);

    this.rendered = false;
    if (this.autoRender) {
        this.render();
    }

}

BierAppStatsGrid.prototype = {
    render: function () {
        var _this = this;

        //HTML skel
        this.div = document.createElement('div');
        this.div.setAttribute('id', this.id);

        this.chartDiv = document.createElement('div');


        this.panel = this._createPanel();

    },
    draw: function () {
        this.targetDiv = (this.target instanceof HTMLElement ) ? this.target : document.querySelector('#' + this.target);
        if (!this.targetDiv) {
            console.log('target not found');
            return;
        }
        this.targetDiv.appendChild(this.div);
        this.panel.render(this.div);
    },
    _createPanel: function () {
        var _this = this;

        var data = this.stats;
        var consequenceTypeData = [];
        for (var key in data.consequenceTypes) {
            consequenceTypeData.push([Utils.formatText(key, "_"), data.consequenceTypes[key]])
        }

        $(this.chartDiv).highcharts({
            chart: {
                plotBackgroundColor: null,
                plotBorderWidth: null,//null or 1..,
                plotShadow: false
            },
            title: {
//                text: 'Browser market shares at a specific website, 2014'
                text: null
            },
            tooltip: {
                pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
            },
            credits: {
                enabled: false
            },
            plotOptions: {
                pie: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    dataLabels: {
                        enabled: true,
                        format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                        style: {
                            color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                        }
                    }
                }
            },
            series: [
                {
                    type: 'pie',
                    name: 'Frequency',
                    data: consequenceTypeData,
//                    data: [
//                        ['Firefox', 45.0],
//                        ['IE', 26.8],
//                        {
//                            name: 'Chrome',
//                            y: 12.8,
//                            sliced: true,
//                            selected: true
//                        },
//                        ['Safari', 8.5],
//                        ['Opera', 6.2],
//                        ['Others', 0.7]
//                    ]
                }
            ]
        });
//
//
//        tpl: new Ext.XTemplate(
//                '<table class="ocb-stats-table">' +
//                '<tr>' +
//                '<td class="header">Minor Allele Frequency:</td>' +
//                '<td>{maf} ({mafAllele})</td>' +
//                '</tr>',
//                '<tr>' +
//                '<td class="header">Minor Genotype Frequency:</td>' +
//                '<td>{mgf} ({mgfAllele})</td>' +
//                '</tr>',
//                '<tr>' +
//                '<td class="header">Mendelian Errors:</td>' +
//                '<td>{mendelianErrors}</td>' +
//                '</tr>',
//                '<tr>' +
//                '<td class="header">Missing Alleles:</td>' +
//                '<td>{missingAlleles}</td>' +
//                '</tr>',
//                '<tr>' +
//                '<td class="header">Missing Genotypes:</td>' +
//                '<td>{missingGenotypes}</td>' +
//                '</tr>',
//            '</table>'
//        ),

        var itemTplSamples = new Ext.XTemplate(
            '<table class="ocb-stats-table">',
//                '<tr>' +
//                '<td class="header">Samples</td>' +
//                '</tr>',
            '<tpl for="samples">',
                '<tr>' +
                '<td>{.}</td>' +
                '</tr>',
            '</tpl>',
            '</table>'
        );

        var globalStats = new Ext.XTemplate(
                '<table class="ocb-stats-table">' +
                '<tr>' +
                '<td class="header">Num variants:</td>' +
                '<td>{variantsCount}</td>' +
                '</tr>',
                '<tr>' +
                '<td class="header">Num samples:</td>' +
                '<td>{samplesCount}</td>' +
                '</tr>',
                '<tr>' +
                '<td class="header">Num indels:</td>' +
                '<td>{indelCount}</td>' +
                '</tr>',
                '<tr>' +
                '<td class="header">Num biallelic:</td>' +
                '<td>{biallelicsCount}</td>' +
                '</tr>',
                '<tr>' +
                '<td class="header">Num multiallelic:</td>' +
                '<td>{multiallelicsCount}</td>' +
                '</tr>',
                '<tr>' +
                '<td class="header">Num transitions:</td>' +
                '<td>{transitionsCount}</td>' +
                '</tr>',
                '<tr>' +
                '<td class="header">Num transversions:</td>' +
                '<td>{transversionsCount}</td>' +
                '</tr>',
                '<tr>' +
                '<td class="header">% PASS:</td>' +
                '<td>{[this.pass(values)]}%</td>' +
                '</tr>',
                '<tr>' +
                '<td class="header">Ti/Tv Ratio:</td>' +
                '<td>{[this.titv(values)]}</td>' +
                '</tr>',
                '<tr>' +
                '<td class="header">Avg. Quality:</td>' +
                '<td>{[this.avgq(values)]}</td>' +
                '</tr>',
            '</table>',
            {
                pass: function (values) {
                    var res = values.passCount / values.variantsCount;
                    return res.toFixed(2);
                },
                titv: function (values) {
                    var res = values.transitionsCount / values.transversionsCount;
                    return res.toFixed(2);
                },
                avgq: function (values) {
                    var res = values.accumulatedQuality / values.variantsCount;
                    return res.toFixed(2);
                }
            }
        );

        var items = [
            {
                xtype: 'panel',
                title: 'Effects',
                header: this.headerConfig,
                border: 0,
                layout: 'hbox',
                flex: 1,
                items: [
                    {
                        xtype: 'box',
                        margin: 2,
                        data: data.globalStats,
                        tpl: globalStats
                    },
                ]
            },
//            {
//                xtype: 'panel',
//                title: 'Samples',
//                header: this.headerConfig,
//                border: 0,
//                layout: 'fit',
//                flex: 0.8,
//                items: [
//                    {
//                        xtype: 'box',
//                        margin: 2,
//                        data: data,
//                        tpl: itemTplSamples
//                    }
//                ]
//            },
            {
                xtype: 'panel',
                title: 'Consequence type',
                header: this.headerConfig,
                border: 0,
                layout: 'fit',
                flex: 5,
                contentEl: this.chartDiv
            }
        ];

        var panel = Ext.create('Ext.container.Container', {
            layout: {
                type: 'hbox',
                align: 'stretch'
            },
            defaults: {
                margin: 5
            },
            overflowY: true,
            padding: 10,
            items: items,
            height: this.height
        });
        return panel;
    }

}


