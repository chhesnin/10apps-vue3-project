<template lang='pug'>
.app-calendar
  h1.title Calendar
  .calendar
    section.space-between
      .block.month {{ currentMonth }}
      .block.year {{ currentYear }}
    section
      .block.day(v-for="(day, index) in days", :key="day") 
        p {{ day }}
    section
      //- ***加沒有內容之 .block 在前面，將1號推到正確的星期！
      //- *v-for="num in 10" num 從1起算
      .block(v-for="num in startDay()")
      //- *:class="{class名: if判斷式(method||Boolean||運算式)}"
      .block(
        v-for="num in daysInMonth()",
        :class="{ red: isCurrentDate(num) }",
        :key="num"
      ) 
        p {{ num }}
    section.space-between
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
      // *currentMonth 有 +1
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
    margin-bottom: 30px
    letter-spacing: 1px
  .calendar
    display: flex
    flex-direction: column
    width: 350px
    @media screen and (max-width: 880px)
      width: 280px
    *
      box-sizing: border-box
    section
      display: flex
      flex-direction: row
      // *在上層容器設定 fw: wrap, 其更上層容器需有 size 限制
      flex-wrap: wrap
      margin-bottom: 10px
      &.space-between
        justify-content: space-between
      .block
        // border: 1px solid #000
        +size(50px,40px)
        @media screen and (max-width: 880px)
          +size(40px,40px)
        +flex
        font-weight: 100
        &.month,&.year
          +size(50px,30px)
          color: rgba(#177089,0.8)
          font-weight: 700
          @media screen and (max-width: 880px)
            +size(40px,30px)
        &.day
          font-weight: 600
        &.red
          color: #C43131
          font-weight: 700
      .btn
        padding: 5px 30px
</style>