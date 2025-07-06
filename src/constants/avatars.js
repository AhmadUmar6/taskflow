// This is a static, predefined list. It will never change.
export const AVATAR_OPTIONS = [
    { id: 1, sex: 'man', faceColor: '#F9C9B6', earSize: 'big', hairStyle: 'thick', hatStyle: 'none', eyeStyle: 'oval', shirtStyle: 'hoody', shirtColor: '#6BD9E9', bgColor: 'linear-gradient(45deg, #3e1ccd 0%, #ff6875 100%)' },
    { id: 2, sex: 'woman', faceColor: '#AC6651', earSize: 'small', hairStyle: 'womanLong', hatStyle: 'none', eyeStyle: 'circle', glassesStyle: 'round', shirtStyle: 'short', shirtColor: '#77311D', bgColor: 'linear-gradient(45deg, #d6b379 0%, #bf6e4e 100%)' },
    { id: 3, sex: 'man', faceColor: '#F9C9B6', earSize: 'small', hairStyle: 'mohawk', hatStyle: 'beanie', hatColor: 'white', eyeStyle: 'smile', shirtStyle: 'short', shirtColor: '#F4D150', bgColor: 'linear-gradient(45deg, #176fff 0%, #68ffef 100%)' },
    { id: 4, sex: 'woman', faceColor: '#AC6651', earSize: 'big', hairStyle: 'womanShort', hatStyle: 'none', eyeStyle: 'oval', glassesStyle: 'none', shirtStyle: 'hoody', shirtColor: '#FC909F', bgColor: 'linear-gradient(45deg, #5617ff 0%, #ff68c5 100%)' },
    { id: 5, sex: 'man', faceColor: '#F9C9B6', earSize: 'big', hairStyle: 'normal', hatStyle: 'none', eyeStyle: 'circle', glassesStyle: 'none', shirtStyle: 'short', shirtColor: '#9287FF', bgColor: 'linear-gradient(90deg, #3e1ccd 0%, #ff6875 100%)' },
    { id: 6, sex: 'woman', faceColor: '#AC6651', earSize: 'small', hairStyle: 'normal', hatStyle: 'beanie', hatColor: 'green', eyeStyle: 'smile', shirtStyle: 'hoody', shirtColor: '#D2EFF3', bgColor: 'linear-gradient(45deg, #17ffc1 0%, #68ff97 100%)' },
    { id: 7, sex: 'man', faceColor: '#F9C9B6', earSize: 'small', hairStyle: 'thick', hatStyle: 'none', eyeStyle: 'oval', glassesStyle: 'round', shirtStyle: 'short', shirtColor: '#506AF4', bgColor: 'linear-gradient(45deg, #17a2ff 0%, #68dcff 100%)' },
    { id: 8, sex: 'woman', faceColor: '#AC6651', earSize: 'big', hairStyle: 'womanLong', hatStyle: 'none', eyeStyle: 'circle', shirtStyle: 'hoody', shirtColor: '#FF9554', bgColor: 'linear-gradient(45deg, #ffc817 0%, #ff6868 100%)' },
];

// We also define a default avatar here to use for new users.
export const DEFAULT_AVATAR = AVATAR_OPTIONS[0];