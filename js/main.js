function isChristmasTime(){if(isFestiveSeason()){document.body.classList.add("is-december");const e=document.createElement("snow-flakes");e.setAttribute("flakes","300"),document.body.appendChild(e);const t=document.createElement("script");t.src="https://marcopollacci.github.io/christmas-tree/components/snowflake.js",t.defer=!0,document.body.appendChild(t);document.querySelector("img").src="images/me-christmas.webp"}}function isFestiveSeason(){const e=new Date,t=e.getFullYear(),s=new Date(t,10,15),n=new Date(t+1,0,6);return 0===e.getMonth()&&e.getDate()<=6||e>=s&&e<=n}isChristmasTime();