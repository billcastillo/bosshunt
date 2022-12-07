// https://yoga-ran.com/?p=news&id=6
// https://guidescroll.com/2011/12/ran-online-boss-hunting-guide/

export const SITE_TITLE = 'Boss Hunt Timer';
export const SITE_DESCRIPTION = 'Pinakamabait na guild sa Ran Online Pinas. bagsakan ng mga pinakamatitikas at matatag na players. ';


export const BOSS_TYPES = [
  {
    name: 'Dark Arts Master',
    id: 'DAM',
    respawn_time: 30,
    locations: [
      {
        name: 'Leonine Campus B3',
        id: 'B3'
      }
    ]
  },
  {
    name: 'Cruel Jupiter',
    id: 'CJ',
    respawn_time: 480,
    locations: [
      {
        name: 'Practicing Yard',
        id: 'PY'
      },
      {
        name: 'Shibuya',
        id: 'SBY'
      }
    ]
  },
  {
    name: 'Corrupted Bumbero',
    id: 'CB',
    respawn_time: 40,
    locations: [
      {
        name: 'Middle Hole',
        id: 'MH'
      }
    ]
  },
  {
    name: 'Spice Boy',
    id: 'SB',
    respawn_time: 60,
    locations: [
      {
        name: 'Middle Hole',
        id: 'MH'
      }
    ]
  },
  {
    name: 'Ninja Knife',
    id: 'NK',
    respawn_time: 60,
    locations: [
      {
        name: 'Sacred Gate Hole',
        id: 'SGH'
      },
      {
        name: 'Shibuya',
        id: 'SBY'
      }
    ]
  },
  {
    name: 'Guillotine Master',
    id: 'GM',
    respawn_time: 480,
    locations: [
      {
        name: 'Prison / Middle Hole',
        id: 'PMH'
      },
    ]
  },
  {
    name: 'Dark Swordsman',
    id: 'DS',
    respawn_time: 60,
    schools: true,
    locations: [
      {
        name: 'Sacred Gate Hole',
        id: 'SGH',
        schoolType: 'SG'
      },
      {
        name: 'Mystic Peak Hole',
        id: 'MPH',
        schoolType: 'MP'
      },
      {
        name: 'Phoenix Hole',
        id: 'PNXH',
        schoolType: 'PNX'
      },
    ]
  },
  {
    name: 'Dark Swordsman Jr.',
    id: 'DSJR',
    respawn_time: 60,
    schools: true,
    locations: [
      {
        name: 'Sacred Gate Campus',
        id: 'SGC',
        schoolType: 'SG'
      },
      {
        name: 'Mystic Peak Campus',
        id: 'MPC',
        schoolType: 'MP'
      },
      {
        name: 'Phoenix Campus',
        id: 'PNXC',
        schoolType: 'PNX'
      },
    ]
  },
  {
    name: 'Ethereal Fist',
    id: 'EF',
    respawn_time: 60,
    schools: true,
    locations: [
      {
        name: 'Sacred Gate Hole',
        id: 'SGH',
        schoolType: 'SG'
      },
      {
        name: 'Mystic Peak Hole',
        id: 'MPH',
        schoolType: 'MP'
      },
      {
        name: 'Phoenix Hole',
        id: 'PNXH',
        schoolType: 'PNX'
      },
    ]
  },
];

export const SCHOOLS = {
  SG: {
    name: 'Sacred Gate School',
    imageUrl: '/logo/sg-logo.png'
  },
  MP: {
    name: 'Mystic Peak School',
    imageUrl: '/logo/mp-logo.png'
  },
  PNX: {
    name: 'Phoenix School',
    imageUrl: '/logo/pnx-logo.png'
  }
};