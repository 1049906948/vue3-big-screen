import dayjs from 'dayjs'  // 1、先引入dayjs

export function formatDay( date ) {
    return dayjs(date).format("YYYY-MM-DD HH:mm:ss")
}

export function getDiffDay(startDate,endDate){

    return dayjs(endDate).diff(startDate,'day')
}

