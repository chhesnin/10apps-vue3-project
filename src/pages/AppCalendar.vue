<template lang='pug'>
.app-calendar
  h1.title Calendar
  .calendar
    section.sb
      .block.month {{ currentMonth }}
      .block.year {{ currentYear }}
    section
      .block.day(v-for="(day, index) in days", :key="day") 
        p {{ day }}
    section
      //- ***加在前面不{{}}就好了！！！
      .block(v-for="num in startDay()")
      //- *:class="{class名: method亦可直接給運算式}"
      .block(
        v-for="num in daysInMonth()",
        :class="{ red: isCurrentDate(num) }",
        :key="num"
      ) 
        p {{ num }}
    section.sb
      button.btn(@click="prev") Prev
      button.btn(@click="next") Next
</template>

<script>
export default {
  data() {
    return {
      currentDate: new Date().getDate(),
      currentMonth: new Date().getMonth() + 1,
      currentYear: new Date().getFullYear(),
      days: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
      dateArr: [],
    };
  },
  computed: {},
  methods: {
    daysInMonth() {
      // *取最後一天
      return new Date(this.currentYear, this.currentMonth, 0).getDate();
    },
    startDay() {
      // *currentMonth有+1
      return new Date(this.currentYear, this.currentMonth - 1, 1).getDay();
    },
    next() {
      if (this.currentMonth <= 11) {
        this.currentMonth++;
      } else {
        this.currentMonth = 1;
        this.currentYear++;
      }
    },
    prev() {
      if (this.currentMonth > 1) {
        this.currentMonth--;
      } else {
        this.currentMonth = 12;
        this.currentYear--;
      }
    },
    isCurrentDate(num) {
      // *.toDateString()
      let CalendarFullDate = new Date(
        this.currentYear,
        this.currentMonth - 1,
        num
      ).toDateString();
      let currentFullDate = new Date().toDateString();
      return CalendarFullDate === currentFullDate;
    },
  },
};
</script>

<style lang='sass'>
=size($w,$h:$w)
  width: $w
  height: $h
=flex
  display: flex
  justify-content: center
  align-items: center

.app-calendar
  display: flex
  flex-direction: column
  align-items: center
  margin-top: 30px
  .title
    text-align: center
    margin-bottom: 30px
    letter-spacing: 1px
  .calendar
    display: flex
    flex-direction: column
    width: 420px
    *
      box-sizing: border-box
    section
      display: flex
      flex-direction: row
      // *在上層容器設定fw: wrap，其更上層容器需有size限制
      flex-wrap: wrap
      margin-bottom: 10px
      &.sb
        justify-content: space-between
      .block
        // border: 1px solid #000
        +size(60px,40px)
        +flex
        font-weight: 100
        &.month,&.year
          +size(60px,30px)
          color: rgba(#177089,0.8)
          font-weight: 700
        &.day
          font-weight: 600
        &.red
          color: #c43131
          font-weight: 700
      .btn
        padding: 5px 30px
</style>