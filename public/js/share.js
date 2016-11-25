var GLOBAL_mockData = {
    'datasources': [
        'rto',
        'org',
        'admin',
        'invoice'
    ],
    'schemas': {
        'rto': [{
            name: 'RtoCode',
            type: 'string'
        }, {
            name: 'RtoName',
            type: 'string'
        }],
        'org': [{
            name: 'OrgCode',
            type: 'string'
        }, {
            name: 'OrgName',
            type: 'string'
        }],
        'admin': [{
            name: 'AdminCode',
            type: 'string'
        }, {
            name: 'AdminName',
            type: 'string'
        }],
        'invoice': [{
            name: 'Id',
            type: 'number'
        }, {
            name: 'Name',
            type: 'string'
        }, {
            name: 'Price',
            type: 'number'
        }]
    },
    'datas': {
        'rto': [{
            RtoCode: 'R415',
            RtoName: 'Rto 1'
        }, {
            RtoCode: 'R416',
            RtoName: 'Rto 2'
        }],
        'org': [{
            OrgCode: 'O111',
            OrgName: 'Org 1'
        }, {
            OrgCode: 'O112',
            OrgName: 'Org 2'
        }],
        'admin': [{
            AdminCode: 'A1',
            AdminName: 'Admin 1'
        }, {
            AdminCode: 'A2',
            AdminName: 'Admin 2'
        }],
        'invoice': [{
            Id: '1',
            Name: 'Course 1',
            Price: 50
        }, {
            Id: '2',
            Name: 'Course 2',
            Price: 40
        }, {
            Id: '3',
            Name: 'Course 3',
            Price: 30
        }]
    }
};
