<script>
import Subject from './components/Subject'
import IconLink from './components/IconLink'
import timetable from './table.json'

export default {
  name: 'app',
  components: {
    Subject,
    IconLink
  },

  created () {
    let _tab = this.$cookie.get('tab')
    if (_tab) this.tab = Number(_tab)
    this.updateMealAPI()
  },

  data () {
    return {
      // today: new Date().getDay() - 1,
      today: 3,
      grade: 1, // 학년 (버튼)
      tab: 1, // 반 (탭)
      menu: {
        breakfast: ['', '', '', '', ''],
        lunch: ['', '', '', '', ''],
        dinner: ['', '', '', '', '']
      }, // 일주일 식단 정보 
      schedule: [], // 일주일 학사일정 정보 
      timetable: timetable // (학년, 반)별 시간표 정보 
    }
  },

  methods: {
    updateMealAPI: function () {
      const week = this.getWeekDates()
      for (let i = 0; i < 5; i++) {
        this.$http.get(`https://dev-api.dimigo.in/dimibobs/${week[i]}`)
          .then((res) => {
            this.menu.breakfast.splice(i, 1, res.data.breakfast)
            this.menu.lunch.splice(i, 1, res.data.lunch)
            this.menu.dinner.splice(i, 1, res.data.dinner)
          })
      }
    },

    selectTab: function (_tab) {
      this.$cookie.set('tab', _tab, '1Y')
      this.tab = _tab
    },

    getTodayClass: function (_day) {
      return { today: (_day === this.today) }
    },

    getWeekDates: function () {
      let date = new Date();
      let day = date.getDay();
      let week = []
      for (let i = 1; i < 6; i++) {
          if (i - day != 0) {
            let newDate = new Date(date.getTime() + ((i - day) * 24 * 60 * 60 * 1000));
            week.push(newDate.toISOString().slice(0, 10).replace(/-/g, ''));
          }
          else week.push(date.toISOString().slice(0, 10).replace(/-/g, ''));
      }
      return week
    }
  }
}
</script>

<template>
  <div id="app">
    <div class="time">
      {{ new Date() | moment('hh:mm A') }}
      <i class="fas fa-bell"></i>
    </div>
    <div class="classes">
      <div class="classes__tab" v-bind:class="{ 'selected': tab == _class }"
        v-for="_class in [1, 2, 3, 4, 5, 6]" :key="_class"
        @click="selectTab(_class)"
      >
        {{ grade }} - {{ _class }}
      </div>
    </div>
    <div class="content">
      <table>
        <tbody>
          <tr>
            <td class="day" v-for="idx in [0, 1, 2, 3, 4]" :key="idx"
              v-bind:class="getTodayClass(idx)"
            >
              <span class="title" v-if="idx === today">오늘</span>
              <span class="day-pin">{{ '월화수목금'[idx] }}</span>
            </td>
          </tr>
          <tr>
            <td class="meal" v-for="(meal, idx) in menu.breakfast" :key="idx"
              v-bind:class="getTodayClass(idx)"              
            >
              {{ meal }}
            </td>
          </tr>
          <tr v-for="time in [0, 1, 2, 3]" :key="time">
            <Subject v-for="day in [0, 1, 2, 3, 4]" :key="day"
              v-bind:class="getTodayClass(day)"
              :subject="timetable[grade][tab][day][time]"
            />
          </tr>
          <tr>
            <td class="meal" v-for="(meal, idx) in menu.lunch" :key="idx"
              v-bind:class="getTodayClass(idx)"
            >
              {{ meal }}
            </td>
          </tr>
          <tr v-for="time in [4, 5, 6]" :key="time">
            <Subject v-for="day in [0, 1, 2, 3, 4]" :key="day"
              v-bind:class="getTodayClass(day)"
              :subject="timetable[grade][tab][day][time]"
            />
          </tr>
          <tr>
            <td class="meal" v-for="(meal, idx) in menu.dinner" :key="idx"
              v-bind:class="getTodayClass(idx)"
            >
              {{ meal }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="footer">
      <IconLink icon="dimigoin" name="디미고인"
        url="https://dimigo.in/"
      />
      <IconLink icon="dimigolife" name="디미고 라이프"
        url="https://dimigo.life"        
      />
      <span>ⓒ 2019 KDMHS <strong>18기 여준호</strong></span>
    </div>
  </div>
</template>

<style lang="scss">
@import url('https://cdn.jsdelivr.net/gh/moonspam/NanumSquare@1.0/nanumsquare.css');

#app {
  user-select: none;
  font-family: 'NanumSquare', sans-serif;
}

.time {
  margin: 0.3em;
  font-size: 2em;
  text-align: center;
}

.classes {
  display: flex;
  flex-direction: row;
  align-items: stretch;
  margin-top: 0.8em;
  text-align: center;

  &__tab {
    display: flex;
    justify-content: center;
    flex-direction: column;
    text-align: center;
    flex: 1; 

    color: black;
    background: #fff;
    padding: .8em;
    border-radius: 20px 20px 0 0;
    background-color: #f8f8f8;
    font-weight: 800;
    font-size: 1.2em;
    box-shadow: inset 0 0 .5px lightgray;

    @media (max-width: 700px) {
      font-size: .8em;
      border-radius: 12px 12px 0 0;
    }
  }

  &__tab:hover {
    background-color: #efefef;
  }

  &__tab.selected {
    background-color: #e83c3d;
    color: white;
    box-shadow: none;
  }
}

.content {
  text-align: center;
  border: 2px solid #e4e4e4;
  border-top: 3px solid #e83c3d;

  table {
    width: 100%;
    margin: auto;
    border-collapse: collapse;
    
    td {
      user-select: none;
      width: 20%;
      padding: 5px;
      border: none !important;
    }

    td:nth-child(odd) {
      background-color: #fafafa;
    }

    td.today {
      background-color: #fbdada;
    }

    td.day {
      margin: 2px;

      span.title {
        float: left;
        font-size: 120%;
        font-weight: 800;
        margin-top: 2px;
        margin-left: 5px;

        @media (max-width: 700px) {
          font-weight: 600;
          font-size: 80%;
        }
      }

      span.day-pin {
        float: right;
        color: white;
        background-color: #e83c3d;
        padding: 3px 6.5px;
        border-radius: 25px;

        @media (max-width: 700px) {
          font-size: 80%;
        }
      }
    }

    td.meal {
      font-size: 90%;

      @media (max-width: 700px) {
        display: none;
      }
    }
  }
}

.footer {
  margin-top: .5em;
  
  span {
    font-size: 80%;
  }
}
</style>
