(function () {
  var userRows = [];
  var observerStarted = false;
  var scheduled = false;
  var originalStorageSetItem = Storage.prototype.setItem;
  var originalStorageGetItem = Storage.prototype.getItem;
  var menuKeys = { menus: true, "vue3-admin-menus": true };
  var roleMenuKeys = { roleMenu: true, "vue3-admin-roleMenu": true };
  var sessionTableKeys = { sessionTable: true, "vue3-admin-sessionTable": true };

  function createDoctorAlertMenu() {
    return {
      menu: "健康预警管理",
      child: [
        {
          allButtons: ["新增", "查看", "修改", "删除"],
          appFrontIcon: "cuIcon-wenzi",
          buttons: ["查看"],
          menu: "健康预警",
          menuJump: "列表",
          tableName: "jiankangyujing",
        },
      ],
    };
  }

  function findMenuIndex(menuList, tableName) {
    if (!Array.isArray(menuList)) return -1;
    for (var i = 0; i < menuList.length; i++) {
      var item = menuList[i];
      var child = item && Array.isArray(item.child) ? item.child : [];
      for (var j = 0; j < child.length; j++) {
        if (child[j] && child[j].tableName === tableName) {
          return i;
        }
      }
    }
    return -1;
  }

  function ensureDoctorAlertMenu(menuList) {
    var list = Array.isArray(menuList) ? menuList : [];
    var alertIndex = findMenuIndex(list, "jiankangyujing");
    if (alertIndex >= 0) {
      return list;
    }

    var insertIndex = findMenuIndex(list, "xinlizhishi");
    var doctorAlertMenu = createDoctorAlertMenu();
    if (insertIndex >= 0) {
      list.splice(insertIndex, 0, doctorAlertMenu);
    } else {
      list.push(doctorAlertMenu);
    }
    return list;
  }

  function ensureDoctorAlertInMenus(menus) {
    if (!Array.isArray(menus)) return menus;
    for (var i = 0; i < menus.length; i++) {
      var item = menus[i];
      if (item && item.tableName === "xinliyisheng") {
        item.backMenu = ensureDoctorAlertMenu(item.backMenu);
      }
    }
    return menus;
  }

  function parseJsonValue(value) {
    if (typeof value !== "string" || !value) return null;
    try {
      return JSON.parse(value);
    } catch (error) {
      return null;
    }
  }

  function getCurrentSessionTable() {
    var keys = Object.keys(sessionTableKeys);
    for (var i = 0; i < keys.length; i++) {
      var value = originalStorageGetItem.call(window.localStorage, keys[i]);
      if (value) {
        return value;
      }
    }
    return "";
  }

  function normalizeStoredValue(key, value) {
    if (menuKeys[key]) {
      var menus = parseJsonValue(value);
      if (Array.isArray(menus)) {
        return JSON.stringify(ensureDoctorAlertInMenus(menus));
      }
      return value;
    }

    if (roleMenuKeys[key] && getCurrentSessionTable() === "xinliyisheng") {
      var roleMenu = parseJsonValue(value);
      if (Array.isArray(roleMenu)) {
        return JSON.stringify(ensureDoctorAlertMenu(roleMenu));
      }
    }

    return value;
  }

  function syncStoredMenus() {
    var keys = Object.keys(menuKeys).concat(Object.keys(roleMenuKeys));
    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      var value = originalStorageGetItem.call(window.localStorage, key);
      if (!value) continue;
      var normalized = normalizeStoredValue(key, value);
      if (normalized !== value) {
        originalStorageSetItem.call(window.localStorage, key, normalized);
      }
    }
  }

  function installMenuStoragePatch() {
    if (Storage.prototype.__yyDoctorAlertMenuPatched) return;

    Storage.prototype.setItem = function (key, value) {
      return originalStorageSetItem.call(this, key, normalizeStoredValue(key, value));
    };

    Storage.prototype.__yyDoctorAlertMenuPatched = true;
  }

  function getRequestPath(url) {
    try {
      return new URL(url, window.location.href).pathname;
    } catch (error) {
      return String(url || "");
    }
  }

  function isUserPageRequest(url) {
    return /\/yonghu\/page\/?$/.test(getRequestPath(url));
  }

  function captureUserRows(responseText) {
    try {
      var payload = typeof responseText === "string" ? JSON.parse(responseText) : responseText;
      var list = payload && payload.data && payload.data.list;
      userRows = Array.isArray(list) ? list : [];
      schedulePatch();
    } catch (error) {
      userRows = [];
    }
  }

  function installXhrCapture() {
    if (!window.XMLHttpRequest || window.XMLHttpRequest.prototype.__yyUserExamPatched) return;

    var proto = window.XMLHttpRequest.prototype;
    var open = proto.open;
    var send = proto.send;

    proto.open = function (method, url) {
      this.__yyRequestUrl = url;
      return open.apply(this, arguments);
    };

    proto.send = function () {
      if (isUserPageRequest(this.__yyRequestUrl)) {
        this.addEventListener("load", function () {
          captureUserRows(this.responseText);
        });
      }
      return send.apply(this, arguments);
    };

    proto.__yyUserExamPatched = true;
  }

  function installFetchCapture() {
    if (!window.fetch || window.fetch.__yyUserExamPatched) return;

    var originalFetch = window.fetch;
    var patchedFetch = function (input, init) {
      var url = typeof input === "string" ? input : input && input.url;
      return originalFetch.apply(this, arguments).then(function (response) {
        if (isUserPageRequest(url)) {
          response.clone().text().then(captureUserRows).catch(function () {});
        }
        return response;
      });
    };

    patchedFetch.__yyUserExamPatched = true;
    window.fetch = patchedFetch;
  }

  function currentHashPath() {
    return (window.location.hash || "").replace(/^#/, "").split("?")[0];
  }

  function openUserExamRecords(row) {
    if (!row || row.id == null) return;
    var query = "userid=" + encodeURIComponent(row.id);
    window.location.hash = "/examrecord?" + query;
  }

  function createButton(row) {
    var button = document.createElement("button");
    button.type = "button";
    button.className = "el-button el-button--small action-view yy-user-exam-record-entry";
    button.dataset.userId = String(row.id);
    button.title = "查看该用户的心理测试记录";

    var span = document.createElement("span");
    span.textContent = "心理测试记录";
    button.appendChild(span);

    button.addEventListener("click", function (event) {
      event.preventDefault();
      event.stopPropagation();
      openUserExamRecords(row);
    });

    return button;
  }

  function patchUserTableEntries() {
    scheduled = false;
    if (currentHashPath() !== "/yonghu" || !userRows.length) return;

    var wrappers = Array.prototype.slice.call(
      document.querySelectorAll(".list-wrapper .el-table__body-wrapper .table-button-wrapper")
    );

    wrappers.forEach(function (wrapper, index) {
      var row = userRows[index];
      if (!row || row.id == null) return;

      var existing = wrapper.querySelector(".yy-user-exam-record-entry");
      if (existing && existing.dataset.userId === String(row.id)) return;
      if (existing) existing.remove();

      wrapper.appendChild(createButton(row));
    });
  }

  function schedulePatch() {
    if (scheduled) return;
    scheduled = true;
    window.setTimeout(patchUserTableEntries, 80);
  }

  function installDomObserver() {
    if (observerStarted || !window.MutationObserver) return;
    observerStarted = true;
    new MutationObserver(schedulePatch).observe(document.documentElement, {
      childList: true,
      subtree: true,
    });
  }

  function installStyle() {
    if (document.getElementById("yy-user-exam-record-entry-style")) return;
    var style = document.createElement("style");
    style.id = "yy-user-exam-record-entry-style";
    style.textContent = [
      ".yy-user-exam-record-entry { margin-left: 8px; }",
      ".yy-user-exam-record-entry span { white-space: nowrap; }",
      ".table-button-wrapper { display: flex; flex-wrap: wrap; gap: 8px; align-items: center; }",
      ".table-button-wrapper .yy-user-exam-record-entry { margin-left: 0; }",
    ].join("\n");
    document.head.appendChild(style);
  }

  syncStoredMenus();
  installMenuStoragePatch();
  installStyle();
  installXhrCapture();
  installFetchCapture();
  installDomObserver();
  window.addEventListener("hashchange", schedulePatch);
  window.addEventListener("load", schedulePatch);
})();
