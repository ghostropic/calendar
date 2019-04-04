const cal = {
  init () {
    this.setupUi()
    if (!this.data) {
      this.initialState()
      this.setupEvents()
    }
    this.setupCalendar()
  },

  setupUi () {
    this.ui = {
      today: document.querySelector('.today'),
      prev: document.querySelector('.prev'),
      next: document.querySelector('.next'),
      days: document.getElementsByClassName('day'),
      monthName: document.querySelector('.monthName')
    }
  },

  initialState () {
    this.now = new Date()
    this.data = {
      currentDate: this.now,
      today: this.now.getDay(),
      currentMonth: this.now.getMonth(),
      currentYear: this.now.getFullYear(),
    }
  },

  setupEvents () {
    const { data, ui } = this
    ui.prev.addEventListener('click', () => {
      data.currentMonth = data.currentMonth - 1
      let currentDate = new Date(data.currentDate.getFullYear(), data.currentDate.getMonth()-1, 1)
      this.updateState(currentDate)
      this.init(data)
    })
    
    ui.next.addEventListener('click', () => {
      data.currentMonth = data.currentMonth + 1
      let currentDate = new Date(data.currentDate.getFullYear(), data.currentDate.getMonth()+1, 1)
      this.updateState(currentDate)
      this.init(data)
    })
  },

  setupCalendar () {
    const { currentYear, currentMonth, currentDate } = this.data
    const firstDay = this.firstDay(currentYear, currentMonth)
    const totalDays = this.totalDays(currentYear, currentMonth)

    this.setCurrentMonth(currentDate, currentYear)
    this.clearCalendar()
    this.renderCalendar(firstDay, totalDays)

    if (this.now.getMonth() === currentMonth) {
      this.setCurrentDay(this.now.getDay())
    }
  },

  updateState (currentDate) {
    const { data } = this
    data.currentDate = currentDate
    data.today = currentDate.getDay()
    data.currentYear = currentDate.getFullYear()
    return data
  },

  setCurrentMonth (date, year) {
    const { monthName } = this.ui
    monthName.innerText = `${date.toLocaleString('en-us', {month: 'long'})} ${year}`
  },

  totalDays (year, month) {
    return 32 - new Date(year, month, 32).getDate()
  },
  
  firstDay (currentYear, currentMonth) {
    return new Date(currentYear, currentMonth).getDay()
  },
  
  clearCalendar () {
    const { days } = this.ui
    const today = this.ui.today
    if (today) {
      today.classList.remove('today')
    }
    for(var i=0; i < days.length; ++i) {
      days[i].innerText = ''
    }
  },
  
  renderCalendar (firstDay, totalDays) {
    const { days } = this.ui
    for (let i = 0; i < totalDays - firstDay; i++) {
      days[i + firstDay].innerText = i + 1
    }
  },

  setCurrentDay (today) {
    const { days } = this.ui
    days[today].classList.add('today')
  }
}

document.addEventListener("DOMContentLoaded", () => {
  cal.init()
})
