const fileTypeColours = {
    '8080xxxx Structure File': 'deepskyblue',
    'Old Mapping Data': 'greenyellow',
    'OTF Font': 'gold',
    'BKHD': 'indianred',
    'Riff': 'lightcoral',
    'Havok': 'burlywood',
    'USM Video': 'darkorchid',
    'Texture Header': 'aquamarine',
    '12 byte Stride Header': 'orangered',
    '24 byte Faces Header': 'aqua',
    '16 byte Unknown Header': 'lightslategray',
    'DirectX Bytecode Header': 'darkseagreen',
    'Texture Data': 'cadetblue',
    'Stride Data': 'crimson',
    'Unknown Type 40 Data': 'dimgray',
    'DirectX Bytecode Data': 'darksalmon',
    'Texture Header (UI)': 'deeppink',
    'Unknown': 'darkgray',
};

const Entry = {
    create: function (type, subType) {
        const self = Object.create(this);
        self.type = type;
        self.subType = subType;
        self.fileType = self.getFileType(self);
        return self;
    },
    getFileType: function (self) {
        if (self.type === 8) {
            // Can use refID and refPkg for better determination of pkg types
            return '8080xxxx Structure File';
        } else if (self.type === 24 && self.subType === 0) {
            return 'Old Mapping Data';
        } else if (self.type === 25) {
            return 'OTF Font';
        } else if (self.type === 26) {
            if (self.subType === 4 || self.subType === 5) {
                return 'BKHD';
            } else if (self.subType === 6) {
                return 'Riff';
            } else if (self.subType === 7) {
                return 'Havok';
            }
        } else if (self.type === 27) {
            return 'USM Video';
        } else if (self.type === 32) {
            if (self.subType === 1 || self.subType === 2 || self.subType === 3) {
                return 'Texture Header';
            } else if (self.subType === 4) {
                return '12 byte Stride Header';
            } else if (self.subType === 6) {
                return '24 byte Faces Header';
            } else if (self.subType === 7) {
                return '16 byte Unknown Header';
            }
        } else if (self.type === 33) {
            return 'DirectX Bytecode Header';
        } else if (self.type === 40) {
            if (self.subType === 1 || self.subType === 2 || self.subType === 3) {
                return 'Texture Data';
            } else if (self.subType === 4) {
                return 'Stride Data';
            } else if (self.subType === 6) {
                return 'Faces Data';
            } else if (self.subType === 7) {
                return 'Unknown Type 40 Data';
            }
        } else if (self.type === 41) {
            return 'DirectX Bytecode Data';
        } else if (self.type === 48) {
            return 'Texture Header (UI)';
        }
        else {
            return 'Unknown';
        }
    }
}

const Block = {
    create: function (fileType, entryCount) {
        const self = Object.create(this);
        self.fileType = fileType;
        self.entryCount = entryCount;
        self.colour = fileTypeColours[self.fileType];
        return self;
    },
}


function getInput() {
    // Types are defined as a basic structure ['type1', 'type2', 'type3', ...]
    let types = document.getElementById('types').value;
    if (types.includes('[')) {
        alert('Do not include square brackets.');
    }
    else if (!types.includes([' '])) {
        alert('Add spaces in between , separators.');
    }
    else {
        processTypes(types.split(', '));
    }
}

function processTypes(types) {
    console.log('Processing types', types);
    let entries = {};
    for (let i=0; i < types.length; i++) {
        let type = types[i];
        let typeArr = type.split(',');
        console.log(type, typeArr);
        let entry = Entry.create(parseInt(typeArr[0]), parseInt(typeArr[1]));
        if (entry.fileType in entries) {
            entries[entry.fileType] += 1;
        } else {
            entries[entry.fileType] = 1;
        }
    }
    let blocks = [];
    for (let key in entries) {
        let value = entries[key];
        let block = Block.create(key, value);
        blocks.push(block);
    }
    replaceHTML(blocks);
}

function getNewHTML(blocks) {
    let newHTML = '';
    for (let i=0; i<blocks.length; i++) {
        let block = blocks[i];
        newHTML += `<div class="type" style="background-color: ${block.colour}">${block.fileType}<br>${block.entryCount}</div>\n`;
    }
    return newHTML;
}

function replaceHTML(blocks) {
    document.getElementById('vis').innerHTML = getNewHTML(blocks);
}