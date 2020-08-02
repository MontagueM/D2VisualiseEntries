const supportedFileTypes = [
    '8080xxxx Structure File',
    'Texture Header',
];

const Entry = {
    create: function (type, subType) {
        const self = Object.create(this);
        self.type = type;
        self.subType = subType;
        self.fileType = getFileType();
        return self;
    },
    getFileType: function () {
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
                return 'Stride Header';
            } else if (self.subType === 6) {
                return 'Faces Header';
            } else if (self.subType === 7) {
                return 'Unknown Data';
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
    create: function (fileType, entries) {
        const self = Object.create(this);
        self.fileType = fileType;
        self.entries = entries;
        self.colour = self.getColour();
        return self;
    },
    getColour: function () {
        if (self.fileType === '')
    }
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
    console.log('Processing types');
    for (let i=0; i < types.length; i++) {
        console.log(types[i]);
    }
}
