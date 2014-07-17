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
    this.height = 500;

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
    _createSummaryPanel: function (data) {
        var _this = this;

        var cts = [];
        var ss = [];

        for (var key in data.consequenceTypes) {
            cts.push({
                name: Utils.formatText(key, "_"),
                count: data.consequenceTypes[key]
            });
        }

        for (var key in data.sampleStats) {
            ss.push({
                sampleName: key,
                homozygotesNumber: data.sampleStats[key].homozygotesNumber,
                mendelianErrors: data.sampleStats[key].mendelianErrors,
                missingGenotypes: data.sampleStats[key].missingGenotypes
            });
        }

        _this.ctStore = Ext.create('Ext.data.Store', {
            fields: ['name', 'count'],
            data: cts

        });

        _this.ssStore = Ext.create('Ext.data.Store', {
            fields: ['sampleName', 'homozygotesNumber', 'mendelianErrors', 'missingGenotypes'],
            data: ss
        });

        var chartCT = Ext.create('Ext.chart.Chart', {
            xtype: 'chart',
            width: 700,
            height: 700,
            store: _this.ctStore,
            animate: true,
            shadow: true,
            legend: {
                position: 'right'
            },
            theme: 'Base:gradients',
            insetPadding: 60,
            series: [
                {
                    type: 'pie',
                    field: 'count',
                    showInLegend: true,
                    tips: {
                        trackMouse: true,
                        width: 200,
                        height: 28,
                        renderer: function (storeItem, item) {
                            //calculate percentage.
                            var total = 0;
                            _this.ctStore.each(function (rec) {
                                total += rec.get('count');
                            });
                            var name = Utils.formatText(storeItem.get('name'), "_");
                            this.setTitle(name + ': ' + Math.round(storeItem.get('count') / total * 100) + '%');
                        }
                    },
                    highlight: {
                        segment: {
                            margin: 20
                        }
                    },

                    label: {
                        field: 'name',
                        display: 'rotate',
                        contrast: true,
                        font: '10px Arial'
                    }

                }
            ]
        });

        var itemTplSamples = new Ext.XTemplate(
            '<table cellspacing="0" style="max-width:400px;border-collapse: collapse;border:1px solid #ccc;"><thead>',
            '<th style="min-width:50px;border-collapse: collapse;border:1px solid #ccc;padding: 5px;background-color: whiteSmoke;">Samples</th>',
            '</thead><tbody>',
            '<tpl for="samples">',
            '<tr style="border-collapse: collapse;border:1px solid #ccc;">',
            '<td style="border-collapse: collapse;border:1px solid #ccc;padding: 5px;background-color: whiteSmoke;color:steelblue;font-weight:bold;white-space: nowrap;">{.}</td>',
            '</tr>',
            '</tpl>',
            '</tbody></table>'
        );

        var globalStats = new Ext.XTemplate(
            '<table cellspacing="0" style="max-width:400px;border-collapse: collapse;border:1px solid #ccc;"><thead>',
            '<th colspan="2" style="min-width:50px;border-collapse: collapse;border:1px solid #ccc;padding: 5px;background-color: whiteSmoke;">Global Stats</th>',
            '</thead><tbody>',

            '<tr style="border-collapse: collapse;border:1px solid #ccc;">',
            '<td style="border-collapse: collapse;border:1px solid #ccc;padding: 5px;background-color: whiteSmoke;color:steelblue;font-weight:bold;white-space: nowrap;">Num variants</td>',
            '<td style="border-collapse: collapse;border:1px solid #ccc;padding: 5px;background-color: whiteSmoke;">{variantsCount}</td>',
            '</tr>',

            '<tr style="border-collapse: collapse;border:1px solid #ccc;">',
            '<td style="border-collapse: collapse;border:1px solid #ccc;padding: 5px;background-color: whiteSmoke;color:steelblue;font-weight:bold;white-space: nowrap;">Num samples</td>',
            '<td style="border-collapse: collapse;border:1px solid #ccc;padding: 5px;background-color: whiteSmoke;">{samplesCount}</td>',
            '</tr>',

            '<tr style="border-collapse: collapse;border:1px solid #ccc;">',
            '<td style="border-collapse: collapse;border:1px solid #ccc;padding: 5px;background-color: whiteSmoke;color:steelblue;font-weight:bold;white-space: nowrap;">Num indels</td>',
            '<td style="border-collapse: collapse;border:1px solid #ccc;padding: 5px;background-color: whiteSmoke;">{indelCount}</td>',
            '</tr>',

            //'<tr style="border-collapse: collapse;border:1px solid #ccc;">',
            //'<td style="border-collapse: collapse;border:1px solid #ccc;padding: 5px;background-color: whiteSmoke;color:steelblue;font-weight:bold;white-space: nowrap;">Num snps</td>',
            //'<td style="border-collapse: collapse;border:1px solid #ccc;padding: 5px;background-color: whiteSmoke;">{snpCount}</td>',
            //'</tr>',

            '<tr style="border-collapse: collapse;border:1px solid #ccc;">',
            '<td style="border-collapse: collapse;border:1px solid #ccc;padding: 5px;background-color: whiteSmoke;color:steelblue;font-weight:bold;white-space: nowrap;">Num biallelic</td>',
            '<td style="border-collapse: collapse;border:1px solid #ccc;padding: 5px;background-color: whiteSmoke;">{biallelicsCount}</td>',
            '</tr>',

            '<tr style="border-collapse: collapse;border:1px solid #ccc;">',
            '<td style="border-collapse: collapse;border:1px solid #ccc;padding: 5px;background-color: whiteSmoke;color:steelblue;font-weight:bold;white-space: nowrap;">Num multiallelic</td>',
            '<td style="border-collapse: collapse;border:1px solid #ccc;padding: 5px;background-color: whiteSmoke;">{multiallelicsCount}</td>',
            '</tr>',

            '<tr style="border-collapse: collapse;border:1px solid #ccc;">',
            '<td style="border-collapse: collapse;border:1px solid #ccc;padding: 5px;background-color: whiteSmoke;color:steelblue;font-weight:bold;white-space: nowrap;">Num transitions</td>',
            '<td style="border-collapse: collapse;border:1px solid #ccc;padding: 5px;background-color: whiteSmoke;">{transitionsCount}</td>',
            '</tr>',

            '<tr style="border-collapse: collapse;border:1px solid #ccc;">',
            '<td style="border-collapse: collapse;border:1px solid #ccc;padding: 5px;background-color: whiteSmoke;color:steelblue;font-weight:bold;white-space: nowrap;">Num transversions</td>',
            '<td style="border-collapse: collapse;border:1px solid #ccc;padding: 5px;background-color: whiteSmoke;">{transversionsCount}</td>',
            '</tr>',

            '<tr style="border-collapse: collapse;border:1px solid #ccc;">',
            '<td style="border-collapse: collapse;border:1px solid #ccc;padding: 5px;background-color: whiteSmoke;color:steelblue;font-weight:bold;white-space: nowrap;">% PASS</td>',
            '<td style="border-collapse: collapse;border:1px solid #ccc;padding: 5px;background-color: whiteSmoke;">{[this.pass(values)]}%</td>',
            '</tr>',

            '<tr style="border-collapse: collapse;border:1px solid #ccc;">',
            '<td style="border-collapse: collapse;border:1px solid #ccc;padding: 5px;background-color: whiteSmoke;color:steelblue;font-weight:bold;white-space: nowrap;">Ti/Tv Ratio</td>',
            '<td style="border-collapse: collapse;border:1px solid #ccc;padding: 5px;background-color: whiteSmoke;">{[this.titv(values)]}</td>',
            '</tr>',

            '<tr style="border-collapse: collapse;border:1px solid #ccc;">',
            '<td style="border-collapse: collapse;border:1px solid #ccc;padding: 5px;background-color: whiteSmoke;color:steelblue;font-weight:bold;white-space: nowrap;">Avg. Quality</td>',
            '<td style="border-collapse: collapse;border:1px solid #ccc;padding: 5px;background-color: whiteSmoke;">{[this.avgq(values)]}</td>',
            '</tr>',
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
                xtype: 'container',
                layout: 'vbox',
                flex: 1,
                items: [
                    {
                        xtype: 'box',
                        flex: 1,
                        margin: 10,
                        data: data,
                        tpl: itemTplSamples
                    },
                    {
                        xtype: 'box',
                        flex: 1,
                        margin: 10,
                        data: data.globalStats,
                        tpl: globalStats
                    }
                ]
            },
            {
                xtype: 'container',
                layout: 'vbox',
                flex: 3,
                items: [
                    {
                        xtype: 'box',
                        width: 700,
                        html: '<div style="border:1px solid #ccc;padding: 5px;background-color: whiteSmoke;font-weight: bold;">Consequence type</div>'
                    },
                    chartCT
                ]
            }
        ];

        var panel = Ext.create('Ext.window.Window', {
            title: 'Summary',
            height: 1000,
            border: 0,
            layout: 'hbox',
            bodyPadding: 60,
            width: 1000,
            autoScroll: true,
            modal: true,
            minimizable: true,
            closable: false,
            items: items,
            listeners: {
                minimize: function (win, obj) {
                    win.hide();
                }
            }
        });

        return panel;
    }

  }


