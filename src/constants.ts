export const API_DOMAIN = "https://admin.job-ly.ru/";
export const PLATFORMS_DEFAULT = [
    {
        'platform': 'hh',
        'domain': 'hh.ru',
        'svg': 'hh-50',
        'isAuthenticated': false,
        'data' : null
    },
    {
        'platform': 'rabota',
        'domain': 'rabota.ru',
        'svg': 'rabota-50',
        'isAuthenticated': false,
        'data' : null
    },
    {
        'platform': 'zarplata',
        'domain': 'zarplata.ru',
        'svg': 'zarplata-50',
        'isAuthenticated': false,
        'data' : null
    },
    {
        'platform': 'superjob',
        'domain': 'superjob.ru',
        'svg': 'superjob-50',
        'isAuthenticated': false,
        'data' : null
    },
    {
        'platform': 'careerist',
        'domain': 'careerist.ru',
        'svg': 'careerist-50',
        'isAuthenticated': false,
        'data' : null
    },
    {
        'platform': 'youla',
        'domain': 'youla.ru',
        'svg': 'popup-youla',
        'isAuthenticated': false,
        'data' : null
    },
    {
        'platform': 'avito',
        'domain': 'avito.ru',
        'svg': 'avito-50',
        'isAuthenticated': false,
        'data' : null
    },
];

export const PLATFORM_PROPERTIES = {
    'hh': {
      name: {
        name: 'name',
      },
      description: {
        name: 'description',
      },
      code: {
        name: 'code',
      },
    }
};