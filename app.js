const keyCount = (state, keys) => state.keys.filter(key => keys.includes(key)).length;
const keyStarts = (state, prefixes) => state.keys.some(key => prefixes.some(prefix => key.startsWith(prefix)));
const hasKey = (state, keys) => state.keys.some(key => keys.includes(key));
const changedWith = (state, prefixes) => state.changed && keyStarts(state, prefixes);

const lessons = [
  {
    level: "基础",
    title: "普通模式与方向键位",
    goal: "只使用 h、j、k、l 移动光标，累计 16 次。",
    intro: "Vim 的核心不是先输入文字，而是先在普通模式里移动、选择目标、再执行动作。h j k l 分别对应左、下、上、右，它们让手指停在主键区。真实编辑时，你会频繁在配置、代码、日志里做小范围移动，这一关先建立肌肉记忆。",
    steps: ["点击编辑区，确认右上角是 NORMAL。", "不要使用方向键，依次按 h、j、k、l 在多行文本中移动。", "尝试从注释行移动到函数体，再移动到列表项。"],
    checkText: "系统记录到 16 次 h/j/k/l 移动后完成。",
    seed: `// sprint-note.js
// 这是一段待整理的迭代记录，先练习在普通模式里移动。
const sprint = {
  name: "vim-practice",
  owner: "editor-team",
  status: "draft",
  tasks: [
    "review navigation habits",
    "remove repeated notes",
    "format release checklist",
    "search risky config keys"
  ]
};

function summarize(items) {
  return items.map((item, index) => (index + 1) + ". " + item).join("\n");
}

console.log(summarize(sprint.tasks));`,
    tags: ["h", "j", "k", "l"],
    check: state => keyCount(state, ["h", "j", "k", "l"]) >= 16
  },
  {
    level: "基础",
    title: "按词前进：w",
    goal: "使用 w 向后跳到下一个词，累计 10 次。",
    intro: "w 是 Vim 里最常用的移动之一：它跳到下一个 word 的开头。读代码时，你通常不是一格一格挪，而是在变量名、函数名、参数之间跳。掌握 w 后，删除、复制、修改都能和它组合，比如 dw 表示删除到下一个词。",
    steps: ["把光标放在第一行开头。", "连续按 w，观察光标如何落到下一个单词或标点后的词。", "尽量用 w 在变量名、字符串和注释之间穿行。"],
    checkText: "按 w 至少 10 次。",
    seed: `// api-client.js
const requestTimeoutMs = 8000;
const retryLimit = 3;
const endpointUrl = "https://example.test/internal/report";

async function fetchDailyReport(userId, includeDrafts) {
  const query = new URLSearchParams({ userId, includeDrafts });
  const response = await fetch(endpointUrl + "?" + query.toString());
  return response.json();
}

// 练习目标：在 requestTimeoutMs、retryLimit、endpointUrl、fetchDailyReport 之间用 w 跳转。`,
    tags: ["w"],
    check: state => keyCount(state, ["w"]) >= 10
  },
  {
    level: "基础",
    title: "按词后退：b",
    goal: "使用 b 回到前一个词，累计 10 次。",
    intro: "b 与 w 相反，用来回到前一个词的开头。修改代码时经常会跳过头，这时 b 可以快速回退。它也能和操作符组合，例如 db 删除到前一个词。",
    steps: ["先用 w 或 l 移到行中部。", "连续按 b，观察光标如何回到前一个词。", "在长命名和注释句子里练习回退。"],
    checkText: "按 b 至少 10 次。",
    seed: `# release-checklist.md
- confirm database migration backup before deployment
- review feature flag names with product owner
- update customer visible changelog for billing page
- verify rollback command in staging environment
- notify support team about dashboard copy changes

说明：这类长句笔记很适合练习 b，因为你经常需要回到刚刚跳过的词。`,
    tags: ["b"],
    check: state => keyCount(state, ["b"]) >= 10
  },
  {
    level: "基础",
    title: "跳到词尾：e",
    goal: "使用 e 跳到词尾，累计 8 次。",
    intro: "e 会移动到当前或下一个词的末尾。它在修改词尾、追加后缀、检查拼写时很有用。比如 ce 可以从当前位置改到词尾，ye 可以复制到词尾。",
    steps: ["从第一行开头开始。", "按 e，让光标停在单词末尾。", "留意 camelCase、snake_case 和普通英文词的差异。"],
    checkText: "按 e 至少 8 次。",
    seed: `const userProfileCache = new Map();
const payment_retry_window = "15m";
const auditTrailEnabled = true;

function normalizeDisplayName(rawName) {
  return rawName.trim().replace(/\s+/g, " ");
}

// 练习：用 e 停到 userProfileCache、payment_retry_window、normalizeDisplayName 的词尾。`,
    tags: ["e"],
    check: state => keyCount(state, ["e"]) >= 8
  },
  {
    level: "基础",
    title: "行首与行尾：0 和 $",
    goal: "使用 0 与 $ 在行首行尾之间切换，累计 8 次。",
    intro: "0 跳到物理行首，$ 跳到行尾。它们是处理整行内容的基础：你可能要回到行首看缩进，也可能跳到行尾补逗号、分号或注释。",
    steps: ["在任意一行中间停住。", "按 0 到行首，再按 $ 到行尾。", "换几行重复练习，尤其是缩进较深的行。"],
    checkText: "累计使用 0 或 $ 至少 8 次。",
    seed: `function buildInvoiceLine(item) {
  const subtotal = item.price * item.quantity;
  const discount = item.coupon ? item.coupon.amount : 0;
  const tax = Math.round((subtotal - discount) * 0.08);
  return { sku: item.sku, subtotal, discount, tax };
}

// 行首常用于看缩进，行尾常用于补标点或追加注释。`,
    tags: ["0", "$"],
    check: state => keyCount(state, ["0", "$"]) >= 8
  },
  {
    level: "基础",
    title: "首个非空字符：^",
    goal: "使用 ^ 跳到缩进后的第一个字符，累计 6 次。",
    intro: "^ 跳到当前行第一个非空白字符。写代码时，行首通常是缩进，真正重要的是语句开头。相比 0，^ 更适合在有缩进的代码块里定位。",
    steps: ["移动到有缩进的行。", "按 0 看物理行首，再按 ^ 看语句起点。", "在多层缩进里重复。"],
    checkText: "按 ^ 至少 6 次。",
    seed: `if (order.status === "paid") {
  if (order.requiresInvoice) {
    createInvoice(order.id);
    notifyFinance(order.customerId);
  }
  markOrderAsReady(order.id);
}

// 练习 ^：跳过缩进，直接到 if、createInvoice、notifyFinance 等语句开头。`,
    tags: ["^"],
    check: state => keyCount(state, ["^"]) >= 6
  },
  {
    level: "基础",
    title: "单字符查找：f",
    goal: "使用 f 加目标字符在当前行内定位，累计 5 次。",
    intro: "f{char} 会在当前行向右找到指定字符。比如 fa 找到下一个 a，f) 找到右括号。它适合快速定位参数分隔符、引号、括号、冒号等。",
    steps: ["把光标放在函数调用行开头。", "按 f, 找逗号，或按 f) 找右括号。", "多换几行，练习 f 后接不同字符。"],
    checkText: "使用 f 开头的查找至少 5 次。",
    seed: `sendEmail(customer.email, "invoice_ready", { invoiceId, dueDate, amount });
trackEvent("billing.page.open", { userId, plan, region });
const label = formatLabel(account.name, account.tier, account.locale);

// 场景：在很长的函数调用里，f, 和 f) 可以迅速找到参数边界。`,
    tags: ["f"],
    check: state => state.keys.filter(key => key.startsWith("f")).length >= 5
  },
  {
    level: "基础",
    title: "进入插入：i",
    goal: "用 i 进入插入模式，并输入任意文字。",
    intro: "i 是 insert，表示在光标前开始输入。Vim 的节奏通常是：普通模式移动到目标位置，然后 i 进入插入，只输入必要内容，再按 Esc 回到普通模式。",
    steps: ["移动到 TODO 后面或某个单词前。", "按 i 进入 INSERT。", "输入几个字符，然后按 Esc 回到 NORMAL。"],
    checkText: "使用 i 并产生一次文本变更。",
    seed: `// TODO: add validation before saving profile
function saveProfile(profile) {
  return api.post("/profiles", profile);
}

// 场景：在 TODO 或变量名前插入补充说明。`,
    tags: ["i", "Esc"],
    check: state => state.changed && hasKey(state, ["i"])
  },
  {
    level: "基础",
    title: "追加输入：a",
    goal: "用 a 在光标后进入插入模式，并输入任意文字。",
    intro: "a 是 append，表示在光标后开始输入。它常用于给当前字符或当前词后面补内容，例如补一个 s、补单位、补标点。",
    steps: ["把光标停在某个单词末尾前的字符上。", "按 a，输入补充字符。", "按 Esc 回到普通模式。"],
    checkText: "使用 a 并产生一次文本变更。",
    seed: `const reportName = "daily_sale";
const unit = "ms";
const status = "ready";

// 场景：把 daily_sale 补成 daily_sales，或在 ready 后追加说明。`,
    tags: ["a", "Esc"],
    check: state => state.changed && hasKey(state, ["a"])
  },
  {
    level: "基础",
    title: "下方新行：o",
    goal: "用 o 在当前行下方新建一行并输入内容。",
    intro: "o 会在当前行下方打开新行并进入插入模式。写代码、清单、日志时，你经常需要在当前条目下继续补一条。",
    steps: ["把光标放在任意列表项上。", "按 o 打开下方新行。", "输入一条新任务，再按 Esc。"],
    checkText: "使用 o 并产生一次文本变更。",
    seed: `# deploy-notes.md
- pull latest main branch
- run unit tests locally
- build production bundle
- upload release artifact
- verify health endpoint

练习：在某条清单下面追加一个新的检查项。`,
    tags: ["o", "Esc"],
    check: state => state.changed && hasKey(state, ["o"])
  },
  {
    level: "基础",
    title: "上方新行：O",
    goal: "用 O 在当前行上方新建一行并输入内容。",
    intro: "O 会在当前行上方打开新行。它适合补前置说明、补 import、补注释、在日志条目前插入上下文。",
    steps: ["把光标放在函数声明或清单项上。", "按 O 打开上方新行。", "输入注释或新条目，再按 Esc。"],
    checkText: "使用 O 并产生一次文本变更。",
    seed: `function calculateRefund(order) {
  const paid = order.totalPaid;
  const shipped = order.shippedItems.length > 0;
  return shipped ? 0 : paid;
}

// 练习：在函数上方用 O 补一行说明注释。`,
    tags: ["O", "Esc"],
    check: state => state.changed && hasKey(state, ["O"])
  },
  {
    level: "基础",
    title: "删除字符：x",
    goal: "用 x 删除多余字符，累计产生一次变更。",
    intro: "x 删除光标下的字符。它适合处理拼写里多出来的字母、重复标点、错误括号等非常小的修改。",
    steps: ["找到多余字符，例如 duplicatedd 或逗号重复。", "把光标移动到多余字符上。", "按 x 删除它。"],
    checkText: "使用 x 并修改文本。",
    seed: `const duplicateddName = "quarterly report";
const amount = 1200;;
const message = "Payment queued..";

// 场景：删除多出来的 d、分号或句点。`,
    tags: ["x"],
    check: state => changedWith(state, ["x"])
  },
  {
    level: "基础",
    title: "删除整行：dd",
    goal: "用 dd 删除一整行。",
    intro: "dd 是删除当前行。真实场景中，你会用它删除废弃 TODO、重复日志、无用配置。dd 删除后内容进入寄存器，所以后续可以用 p 粘贴回来。",
    steps: ["移动到标记为 remove 的行。", "快速按 d 再按 d。", "观察整行被删除。"],
    checkText: "使用 d 开头的删除并修改文本。",
    seed: `const config = {
  apiBase: "https://api.example.test",
  debug: false,
  removeThisTemporaryFlag: true,
  timeoutMs: 5000,
  retry: 2
};

// 练习：用 dd 删除临时配置行。`,
    tags: ["dd"],
    check: state => changedWith(state, ["d"])
  },
  {
    level: "基础",
    title: "删除一个词：dw",
    goal: "用 dw 删除一个词。",
    intro: "d 是操作符，w 是移动。组合成 dw 就是“从当前位置删除到下一个词”。这就是 Vim 的语法：操作 + 范围。掌握它后，很多动作都能自然组合。",
    steps: ["把光标放到 unwanted 或 redundant 的开头。", "按 d 再按 w。", "观察该词被删除。"],
    checkText: "使用 d 开头的操作并修改文本。",
    seed: `const title = "monthly unwanted revenue summary";
const description = "This redundant paragraph explains the same thing twice.";
const tag = "stable temporary release";

// 场景：删除句子或变量值里不需要的一个词。`,
    tags: ["dw"],
    check: state => changedWith(state, ["d"])
  },
  {
    level: "基础",
    title: "修改一个词：cw",
    goal: "用 cw 修改一个词。",
    intro: "cw 表示 change word：删除当前位置到词尾并进入插入模式。它适合把旧变量名、状态名、文案词快速替换成新词。修改结束后按 Esc。",
    steps: ["把光标放在 draft、pending 或 legacy 的开头。", "按 c 再按 w。", "输入新词，然后按 Esc。"],
    checkText: "使用 c 开头的修改并产生文本变更。",
    seed: `const invoiceStatus = "draft";
const paymentState = "pending";
const storageMode = "legacy";

// 场景：把 draft 改成 sent，把 pending 改成 paid，把 legacy 改成 modern。`,
    tags: ["cw", "Esc"],
    check: state => changedWith(state, ["c"])
  },
  {
    level: "基础",
    title: "替换单字符：r",
    goal: "用 r 替换光标下的一个字符。",
    intro: "r{char} 会把当前字符替换成另一个字符，不进入持续插入。它适合修正单个拼写、标点、数字版本号。",
    steps: ["把光标停在错误字符上。", "按 r，再按正确字符。", "重复修正另一个单字符错误。"],
    checkText: "使用 r 并修改文本。",
    seed: `const env = "prod";
const version = "1.2.8";
const code = "PAYMANT_OK";

// 场景：把 PAYMANT 的 A 修成 E，或把版本号单个数字修正。`,
    tags: ["r"],
    check: state => changedWith(state, ["r"])
  },
  {
    level: "基础",
    title: "复制整行：yy",
    goal: "用 yy 复制当前行。",
    intro: "yy 会复制当前整行到默认寄存器。复制本身不会改变文件，所以这一关只要求你完成复制动作。之后可以配合 p 或 P 粘贴。",
    steps: ["移动到一行模板配置上。", "快速按 y 再按 y。", "状态栏出现按键记录后即可完成。"],
    checkText: "使用 y 开头的复制动作。",
    seed: `routes:
  - path: /dashboard
    role: analyst
    cache: true
  - path: /reports
    role: manager
    cache: true

# 场景：复制一段相似配置，再改 path 或 role。`,
    tags: ["yy"],
    check: state => keyStarts(state, ["y"])
  },
  {
    level: "基础",
    title: "向后粘贴：p",
    goal: "先复制一行，再用 p 粘贴到下方。",
    intro: "p 会把寄存器内容粘贴到光标后面；如果寄存器里是整行，就粘贴到当前行下方。它常用于复制配置块、列表项、测试用例。",
    steps: ["移动到模板行。", "按 yy 复制整行。", "按 p 粘贴到下方。"],
    checkText: "使用 y 复制，并使用 p 粘贴。",
    seed: `testCases.push({ name: "loads dashboard", role: "analyst" });
testCases.push({ name: "exports report", role: "manager" });
testCases.push({ name: "updates profile", role: "owner" });

// 场景：复制一个测试用例，再修改其中的 name 或 role。`,
    tags: ["yy", "p"],
    check: state => keyStarts(state, ["y"]) && hasKey(state, ["p"])
  },
  {
    level: "基础",
    title: "向前粘贴：P",
    goal: "先复制一行，再用 P 粘贴到上方。",
    intro: "P 与 p 相反，会把内容粘贴到光标前面；整行内容会出现在当前行上方。它适合在某个条目前插入相似条目。",
    steps: ["按 yy 复制当前行。", "移动到另一个位置。", "按 P 粘贴到当前行上方。"],
    checkText: "使用 y 复制，并使用 P 粘贴。",
    seed: `- check payment webhook
- verify refund webhook
- confirm invoice webhook
- archive stale webhook logs

场景：把某条检查项复制到另一条之前。`,
    tags: ["yy", "P"],
    check: state => keyStarts(state, ["y"]) && hasKey(state, ["P"])
  },
  {
    level: "基础",
    title: "撤销：u",
    goal: "先做一次编辑，再用 u 撤销。",
    intro: "u 是 undo。Vim 鼓励你大胆做小步编辑，因为撤销非常快。先做一次删除或插入，再按 u 回退。",
    steps: ["用 x、i、a 或 dd 做一次小修改。", "按 Esc 回到普通模式。", "按 u 撤销修改。"],
    checkText: "文本发生过变化，并按过 u。",
    seed: `const safeLimit = 100;
const riskyLimit = 999;
const defaultLimit = 50;

// 练习：先改掉一个数字或删除一个字符，然后用 u 撤销。`,
    tags: ["u"],
    check: state => state.changed && hasKey(state, ["u"])
  },
  {
    level: "基础",
    title: "重做：Ctrl-r",
    goal: "先撤销，再用 Ctrl-r 重做。",
    intro: "Ctrl-r 是 redo，用来恢复刚刚被撤销的变化。它和 u 配合，能让你在两个编辑状态之间来回确认。",
    steps: ["先做一次小修改。", "按 u 撤销。", "按 Ctrl-r 重做。"],
    checkText: "文本变化后，记录到 u 和 Ctrl-r。",
    seed: `featureFlags.enableNewBilling = false;
featureFlags.enableUsageExport = true;
featureFlags.enableSmartRetry = false;

// 练习：修改 true/false 后撤销，再 Ctrl-r 重做。`,
    tags: ["u", "Ctrl-r"],
    check: state => state.changed && hasKey(state, ["u"]) && hasKey(state, ["<C-r>", "<C-R>"])
  },
  {
    level: "进阶",
    title: "重复上次修改：.",
    goal: "做一次可重复修改，然后用 . 重复。",
    intro: ". 是 Vim 的强力命令：重复上一次修改。比如你用 x 删除一个字符，移动到另一个位置按 .，就会再次删除；你用 cw 改一个词，移动后按 . 可以重复同类修改。",
    steps: ["先用 x 或 cw 做一次修改。", "移动到类似位置。", "按 . 重复刚才的修改。"],
    checkText: "文本变化后，按过 .。",
    seed: `const rows = [
  "error:: payment timeout",
  "error:: invoice timeout",
  "error:: profile timeout",
  "error:: report timeout"
];

// 场景：先删除一个多余冒号，再用 . 重复修正其它行。`,
    tags: ["."],
    check: state => state.changed && hasKey(state, ["."])
  },
  {
    level: "进阶",
    title: "查找：/",
    goal: "使用 / 搜索关键词，再用 n 跳到下一个结果。",
    intro: "/ 会从当前位置向后搜索。输入 /timeout 后回车，Vim 会跳到下一个 timeout；再按 n 可继续下一个结果。排查日志、配置、代码引用时，这是比肉眼扫描高效得多的方式。",
    steps: ["按 /，输入 timeout，然后回车。", "按 n 跳到下一个匹配。", "重复几次，观察匹配位置。"],
    checkText: "使用 / 搜索，并按 n 或 N 跳转。",
    seed: `[10:01:12] INFO request started user=alice path=/billing
[10:01:18] WARN timeout while calling invoice-service
[10:02:03] INFO retry scheduled reason=timeout attempt=2
[10:02:16] ERROR payment failed reason=gateway_timeout
[10:03:44] INFO request finished status=500

场景：日志排查时搜索 timeout，连续跳到每个相关事件。`,
    tags: ["/", "n"],
    check: state => hasKey(state, ["/"]) && hasKey(state, ["n", "N"])
  },
  {
    level: "进阶",
    title: "反向查找：?",
    goal: "使用 ? 反向搜索关键词，再用 n 或 N 跳转。",
    intro: "? 与 / 相反，会向前搜索。你在文件底部看到错误时，常常需要向上找最早的定义、请求开始位置或上一次出现的关键词。",
    steps: ["移动到文件靠后的位置。", "按 ?，输入 request，然后回车。", "按 n 或 N 在匹配间移动。"],
    checkText: "使用 ? 搜索，并按 n 或 N 跳转。",
    seed: `[11:00:01] request id=pay_001 opened
[11:00:02] auth ok user=bob
[11:00:03] inventory reserved
[11:00:04] invoice created
[11:00:05] request id=pay_001 failed reason=card_declined

场景：从失败位置向上找 request 的起点。`,
    tags: ["?", "n", "N"],
    check: state => hasKey(state, ["?"]) && hasKey(state, ["n", "N"])
  },
  {
    level: "进阶",
    title: "全局替换：:%s",
    goal: "输入 :%s/foo/bar/g，把所有 foo 替换成 bar。",
    intro: ":%s/旧/新/g 是全文件替换。% 表示整个文件，s 表示 substitute，g 表示一行内替换所有匹配。重命名配置、修正文案、批量替换状态值时很常用。",
    steps: ["按 : 进入 Ex 命令。", "输入 %s/foo/bar/g 并回车。", "确认文件里的 foo 都变成 bar。"],
    checkText: "文件中不再包含 foo，并且包含 bar。",
    seed: `const fooEndpoint = "/v1/foo";
const fooLabel = "foo report";
const payload = { type: "foo", source: "foo-service" };

// 练习命令：:%s/foo/bar/g`,
    tags: [":%s/foo/bar/g"],
    check: state => !state.value.includes("foo") && state.value.includes("bar")
  },
  {
    level: "进阶",
    title: "可视字符选择：v",
    goal: "用 v 选择一段文本，再执行 y 或 d。",
    intro: "v 进入字符级可视模式。它适合精确选择句子的一部分、字符串片段或参数列表。选择后可以 y 复制、d 删除、c 修改。",
    steps: ["移动到一段描述文字开头。", "按 v 后移动光标扩展选择。", "按 y 复制或 d 删除。"],
    checkText: "进入过可视模式，并执行 y 或 d。",
    seed: `const message = "Your invoice is ready for review before payment.";
const tooltip = "Admins can export filtered usage data from this page.";

// 场景：选择字符串中的一小段文案复制或删除。`,
    tags: ["v", "y", "d"],
    check: state => state.visualUsed && keyStarts(state, ["y", "d"])
  },
  {
    level: "进阶",
    title: "可视行选择：V",
    goal: "用 V 选择整行，再执行 y 或 d。",
    intro: "V 进入行级可视模式。它适合移动、复制、删除连续的配置行、列表项或代码块。相比 v，它按整行选择，更不容易漏掉行尾。",
    steps: ["移动到一段连续配置的第一行。", "按 V 进入行选择。", "用 j 扩展选择，再按 y 或 d。"],
    checkText: "使用 V 进入可视模式，并执行 y 或 d。",
    seed: `permissions:
  - billing:read
  - billing:write
  - reports:export
  - users:invite
  - audit:read

# 场景：整行复制或删除一组权限。`,
    tags: ["V", "j", "y", "d"],
    check: state => state.visualUsed && keyStarts(state, ["y", "d"])
  },
  {
    level: "进阶",
    title: "文本对象：ciw",
    goal: "用 ciw 修改光标所在的整个词。",
    intro: "ciw 是 change inner word，意思是不管光标在词的哪个位置，都修改整个词。文本对象让 Vim 从“移动到边界”升级为“直接指定对象”。改变量名、状态词、英文文案时非常好用。",
    steps: ["把光标放在 pending 单词任意位置。", "依次按 c i w。", "输入 approved 或 failed，然后 Esc。"],
    checkText: "使用 c 开头的修改，并产生文本变更。",
    seed: `const reviewState = "pending";
const payoutState = "pending";
const shipmentState = "pending";

// 场景：不用先移动到词首，直接 ciw 修改当前词。`,
    tags: ["ciw"],
    check: state => changedWith(state, ["c"])
  },
  {
    level: "进阶",
    title: "文本对象：di\"",
    goal: "用 di\" 删除双引号内部内容。",
    intro: "di\" 是 delete inner quotes，删除双引号里面的内容但保留引号。它非常适合清空字符串值、替换文案、处理配置。类似地，ci\" 可以直接修改引号内内容。",
    steps: ["把光标放进任意双引号字符串内部。", "依次按 d i \"。", "观察引号还在，内部内容被删除。"],
    checkText: "使用 d 开头的删除并修改文本。",
    seed: `const bannerTitle = "Quarterly billing summary is ready";
const emptyState = "No invoices match the selected filters";
const auditMessage = "User updated payment method from settings page";

// 场景：清空一段字符串，稍后再填新文案。`,
    tags: ["di\""],
    check: state => changedWith(state, ["d"])
  },
  {
    level: "进阶",
    title: "缩进：>>",
    goal: "使用 >> 缩进当前行。",
    intro: ">> 会把当前行向右缩进一级。整理代码块、YAML、Markdown 子列表时很常见。Vim 的缩进命令也能和可视模式配合，对多行同时缩进。",
    steps: ["移动到需要成为子项的行。", "快速按 > 再按 >。", "观察该行缩进增加。"],
    checkText: "使用 > 开头的命令并修改文本。",
    seed: `- billing
- invoice list
- invoice detail
- payment methods
- reports

场景：把 invoice list 和 invoice detail 缩进为 billing 的子项。`,
    tags: [">>"],
    check: state => changedWith(state, [">"])
  },
  {
    level: "进阶",
    title: "反缩进：<<",
    goal: "使用 << 反缩进当前行。",
    intro: "<< 会把当前行向左反缩进一级。它适合修正过深的代码、配置或 Markdown 层级。",
    steps: ["移动到缩进过深的行。", "快速按 < 再按 <。", "观察该行缩进减少。"],
    checkText: "使用 < 开头的命令并修改文本。",
    seed: `function handlePayment() {
    const amount = cart.total;
      const currency = cart.currency;
      const method = cart.method;
    return submitPayment(amount, currency, method);
}

// 场景：currency 和 method 两行缩进过深，需要反缩进。`,
    tags: ["<<"],
    check: state => changedWith(state, ["<"])
  },
  {
    level: "进阶",
    title: "跳到文件首尾：gg 和 G",
    goal: "使用 gg 跳到文件开头，再用 G 跳到文件末尾。",
    intro: "gg 跳到文件第一行，G 跳到最后一行。看长文件、日志、配置时，这两个命令能让你快速回到全局位置。",
    steps: ["先按 G 跳到文件末尾。", "再按 gg 回到文件开头。", "可以重复几次体会长距离移动。"],
    checkText: "记录到 gg 或 G 的长距离跳转。",
    seed: `# migration-log.txt
001 create users table
002 create teams table
003 add team_id to users
004 create invoices table
005 add invoice status index
006 create payment attempts table
007 add retry metadata
008 backfill invoice status
009 create audit events table
010 add retention policy
011 verify row counts
012 mark migration complete

场景：长文件里经常需要在开头说明和末尾结果之间来回跳。`,
    tags: ["gg", "G"],
    check: state => hasKey(state, ["G"]) || state.keys.join(" ").includes("g g") || state.keys.includes("gg")
  },
  {
    level: "高级",
    title: "设置标记：m",
    goal: "用 m 设置标记，再用 ' 或 ` 跳回。",
    intro: "m{letter} 可以在当前位置设置标记，例如 ma。之后 'a 跳回该标记所在行，`a 跳回精确位置。它适合在两个相距很远的位置之间来回编辑。",
    steps: ["在重要配置行按 m 再按 a。", "移动到文件其它位置。", "按 ' 再按 a，或 ` 再按 a 跳回。"],
    checkText: "使用 m 设置标记，并使用 ' 或 ` 跳转。",
    seed: `const criticalConfig = {
  billingProvider: "stripe",
  webhookSecretName: "billing/webhook/secret",
  reconciliationWindowHours: 24
};

// 向下移动到这里后，再跳回上面的关键配置。
function reconcileInvoices(invoices) {
  return invoices.filter(invoice => invoice.status !== "closed");
}

function notifyFinance(summary) {
  return sendSlackMessage("#finance", summary);
}`,
    tags: ["ma", "'a", "`a"],
    check: state => keyStarts(state, ["m"]) && keyStarts(state, ["'", "`"])
  },
  {
    level: "高级",
    title: "录制宏：q",
    goal: "使用 q 开始和结束宏录制。",
    intro: "q{register} 开始录制宏，再按 q 停止。宏会记录你的一串普通模式操作，适合批量处理重复行。常见做法是 qa 录到 a 寄存器。",
    steps: ["按 q，再按 a，开始录制到 a。", "做一个简单修改，例如 I- 然后 Esc。", "再按 q 停止录制。"],
    checkText: "按过至少两次 q。",
    seed: `apple
banana
cherry
date
elderberry

场景：准备把每一行都加工成列表项，先录制处理第一行的动作。`,
    tags: ["qa", "q"],
    check: state => keyCount(state, ["q"]) >= 2
  },
  {
    level: "高级",
    title: "回放宏：@",
    goal: "录制宏后，用 @ 回放。",
    intro: "@{register} 会回放指定寄存器里的宏，例如 @a。宏能把一行上的编辑动作重复应用到多行，是 Vim 处理重复文本的招牌能力。",
    steps: ["先用 qa 录制一个简单宏，再 q 停止。", "移动到下一行。", "按 @ 再按 a 回放宏。"],
    checkText: "使用 q 完成录制，并使用 @ 回放。",
    seed: `user: alice
user: bob
user: carol
user: dylan

场景：给每一行追加同样的字段、前缀或标点。`,
    tags: ["qa", "@a"],
    check: state => keyCount(state, ["q"]) >= 2 && keyStarts(state, ["@"])
  },
  {
    level: "高级",
    title: "保存与退出命令",
    goal: "练习 :w、:q 或 :wq。",
    intro: "Vim 的冒号命令来自 Ex 模式。:w 保存，:q 退出，:wq 保存并退出。本训练页不会真的关闭页面或写磁盘，但会模拟命令反馈。",
    steps: ["按 : 进入命令行。", "输入 w 后回车，观察保存反馈。", "也可以练习 q 或 wq。"],
    checkText: "执行过 :w、:q 或 :wq。",
    seed: `# session.txt
本文件模拟一个正在编辑的笔记。
你可以练习 :w 保存、:q 退出、:wq 保存并退出。
训练页会保留当前页面，避免误关闭。

最后一行：写完后试试 :w。`,
    tags: [":w", ":q", ":wq"],
    check: state => hasKey(state, [":w", ":q", ":wq"])
  }
];

const references = [
  { title: "移动", rows: [["h/j/k/l", "左/下/上/右"], ["w/b/e", "词首/回退/词尾"], ["gg/G", "首行/末行"], ["0/^/$", "行首/首非空/行尾"]] },
  { title: "插入", rows: [["i", "光标前插入"], ["a", "光标后追加"], ["o", "下方新行"], ["O", "上方新行"]] },
  { title: "删除修改", rows: [["x", "删字符"], ["dd", "删整行"], ["dw", "删一个词"], ["cw", "修改一个词"]] },
  { title: "复制粘贴", rows: [["yy", "复制整行"], ["p", "向后粘贴"], ["P", "向前粘贴"], ["u/Ctrl-r", "撤销/重做"]] },
  { title: "查找替换", rows: [["/", "向后查找"], ["?", "向前查找"], ["n/N", "下个/上个"], [":%s/a/b/g", "全局替换"]] },
  { title: "进阶", rows: [[".", "重复修改"], ["ciw", "改当前词"], ["m/'/`", "标记跳转"], ["q/@", "宏录制/回放"]] }
];

const state = {
  lessonIndex: 0,
  keys: [],
  changed: false,
  inserted: false,
  visualUsed: false,
  completed: new Set(),
  value: ""
};

let blockedSubstitutePrefix = false;

const editor = CodeMirror.fromTextArea(document.getElementById("editor"), {
  mode: "javascript",
  theme: "material-darker",
  lineNumbers: true,
  keyMap: "vim",
  showCursorWhenSelecting: true,
  matchBrackets: true,
  indentUnit: 2,
  tabSize: 2,
  autofocus: true
});

const els = {
  lessonList: document.getElementById("lessonList"),
  lessonCounter: document.getElementById("lessonCounter"),
  progressBar: document.getElementById("progressBar"),
  lessonTitle: document.getElementById("lessonTitle"),
  lessonGoal: document.getElementById("lessonGoal"),
  lessonIntro: document.getElementById("lessonIntro"),
  lessonSteps: document.getElementById("lessonSteps"),
  lessonCheck: document.getElementById("lessonCheck"),
  modePill: document.getElementById("modePill"),
  positionLabel: document.getElementById("positionLabel"),
  lastKeyLabel: document.getElementById("lastKeyLabel"),
  feedbackLabel: document.getElementById("feedbackLabel"),
  referenceGrid: document.getElementById("referenceGrid"),
  nextBtn: document.getElementById("nextBtn"),
  resetBtn: document.getElementById("resetBtn")
};

function renderReferences() {
  els.referenceGrid.innerHTML = references.map(group => {
    const rows = group.rows.map(([key, desc]) => `<dt>${key}</dt><dd>${desc}</dd>`).join("");
    return `<article class="ref-card"><h3>${group.title}</h3><dl>${rows}</dl></article>`;
  }).join("");
}

function renderLessons() {
  els.lessonList.innerHTML = lessons.map((lesson, index) => {
    const classes = ["lesson-item"];
    if (index === state.lessonIndex) classes.push("active");
    if (state.completed.has(index)) classes.push("done");
    return `<button class="${classes.join(" ")}" data-index="${index}"><strong>${index + 1}. ${lesson.title}</strong><span>${lesson.level} · ${lesson.goal}</span></button>`;
  }).join("");

  [...els.lessonList.querySelectorAll("button")].forEach(button => {
    button.addEventListener("click", () => loadLesson(Number(button.dataset.index)));
  });
}

function resetLessonState() {
  state.keys = [];
  state.changed = false;
  state.inserted = false;
  state.visualUsed = false;
  state.value = editor.getValue();
  blockedSubstitutePrefix = false;
}

function loadLesson(index) {
  state.lessonIndex = index;
  const lesson = lessons[index];
  editor.setValue(lesson.seed);
  editor.setCursor({ line: 0, ch: 0 });
  CodeMirror.Vim.handleKey(editor, "Esc");
  resetLessonState();
  els.lessonTitle.textContent = `${lesson.level}：${lesson.title}`;
  els.lessonGoal.textContent = lesson.goal;
  els.lessonIntro.textContent = lesson.intro;
  els.lessonSteps.innerHTML = lesson.steps.map(step => `<li>${step}</li>`).join("");
  els.lessonCheck.textContent = lesson.checkText;
  els.lessonCounter.textContent = `${index + 1} / ${lessons.length}`;
  els.feedbackLabel.textContent = `练习键：${lesson.tags.join("  ")}`;
  updateProgress();
  renderLessons();
  editor.focus();
}

function updateProgress() {
  const percent = (state.completed.size / lessons.length) * 100;
  els.progressBar.style.width = `${percent}%`;
}

function modeName() {
  const vim = editor.state.vim;
  if (!vim) return "NORMAL";
  if (vim.insertMode) return "INSERT";
  if (vim.visualMode) return "VISUAL";
  if (vim.inputState && vim.inputState.prefix) return "COMMAND";
  return "NORMAL";
}

function isNormalMode() {
  const vim = editor.state.vim;
  return !vim || (!vim.insertMode && !vim.visualMode && !(vim.inputState && vim.inputState.prefix));
}

function isSubstituteLesson() {
  return lessons[state.lessonIndex].tags.some(tag => tag.startsWith(":%s/"));
}

function isExDialogOpen() {
  return !!editor.getWrapperElement().querySelector(".CodeMirror-dialog input");
}

function stopKey(event) {
  event.preventDefault();
  event.stopPropagation();
  if (event.stopImmediatePropagation) event.stopImmediatePropagation();
}

function updateStatus(lastKey) {
  const cursor = editor.getCursor();
  const mode = modeName();
  els.modePill.textContent = mode;
  els.modePill.style.color = mode === "INSERT" ? "#51b6a5" : mode === "VISUAL" ? "#ff7373" : "#f2bc57";
  els.positionLabel.textContent = `Ln ${cursor.line + 1}, Col ${cursor.ch + 1}`;
  if (lastKey) els.lastKeyLabel.textContent = `Key: ${lastKey}`;
}

function completeIfReady() {
  state.value = editor.getValue();
  const lesson = lessons[state.lessonIndex];
  if (!state.completed.has(state.lessonIndex) && lesson.check(state)) {
    state.completed.add(state.lessonIndex);
    els.feedbackLabel.textContent = "已完成。可以继续下一关，或留在这里多练几遍。";
    updateProgress();
    renderLessons();
  }
}

function nextLesson() {
  const next = (state.lessonIndex + 1) % lessons.length;
  loadLesson(next);
}

CodeMirror.Vim.defineEx("write", "w", cm => {
  els.feedbackLabel.textContent = "已模拟保存。静态训练页不会写入磁盘。";
  state.keys.push(":w");
  completeIfReady();
});

CodeMirror.Vim.defineEx("quit", "q", cm => {
  els.feedbackLabel.textContent = "已模拟退出。为了保留训练现场，页面不会关闭。";
  state.keys.push(":q");
  completeIfReady();
});

CodeMirror.Vim.defineEx("wq", "wq", cm => {
  els.feedbackLabel.textContent = "已模拟保存并退出。训练页仍保持打开。";
  state.keys.push(":wq");
  completeIfReady();
});

editor.getWrapperElement().addEventListener("keydown", event => {
  if (!isSubstituteLesson() || isExDialogOpen() || !isNormalMode() || event.ctrlKey || event.metaKey || event.altKey) return;
  if (event.key === ":") {
    blockedSubstitutePrefix = false;
    return;
  }
  if (event.key === "%") {
    blockedSubstitutePrefix = true;
    stopKey(event);
    els.feedbackLabel.textContent = "全局替换要从 Ex 命令开始：先按英文冒号 :，再输入 %s/foo/bar/g 并回车。";
    return;
  }
  if (blockedSubstitutePrefix && event.key.toLowerCase() === "s") {
    stopKey(event);
    blockedSubstitutePrefix = false;
    els.feedbackLabel.textContent = "这里的 s 不是普通模式的 s，而是 :%s 命令里的 substitute。请完整输入 :%s/foo/bar/g。";
    return;
  }
  blockedSubstitutePrefix = false;
}, true);

function clearSearchHighlight(cm) {
  cm.getWrapperElement().classList.add("search-muted");
  const searchState = cm.state.vim && cm.state.vim.searchState_;
  if (searchState && searchState.getOverlay && searchState.getOverlay()) {
    cm.removeOverlay(searchState.getOverlay());
    searchState.setOverlay(null);
  }
  if (searchState && searchState.getScrollbarAnnotate && searchState.getScrollbarAnnotate()) {
    searchState.getScrollbarAnnotate().clear();
    searchState.setScrollbarAnnotate(null);
  }
  cm.getAllMarks().forEach(mark => {
    const className = mark.className || "";
    if (className.includes("CodeMirror-searching") || className.includes("cm-searching") || className.includes("searching")) mark.clear();
  });
  if (cm.state.overlays) {
    cm.state.overlays.slice().forEach(overlay => {
      const mode = overlay.mode || overlay;
      if (mode && (mode.query || String(mode.token).includes("searching"))) cm.removeOverlay(mode);
    });
  }
  cm.refresh();
  window.setTimeout(() => {
    if (searchState && searchState.getOverlay && searchState.getOverlay()) {
      cm.removeOverlay(searchState.getOverlay());
      searchState.setOverlay(null);
    }
    cm.getWrapperElement().classList.add("search-muted");
    cm.refresh();
  }, 80);
  els.feedbackLabel.textContent = "已取消当前搜索高亮。再次使用 / 或 ? 搜索时会重新显示。";
  state.keys.push(":noh");
}

CodeMirror.Vim.defineEx("nohlsearch", "noh", clearSearchHighlight);
CodeMirror.Vim.defineEx("nohlsearch", "nohlsearch", clearSearchHighlight);

editor.on("vim-keypress", key => {
  state.keys.push(key);
  if (key === "/" || key === "?") editor.getWrapperElement().classList.remove("search-muted");
  if (["i", "a", "o", "O", "s", "S", "c", "C"].includes(key[0])) state.inserted = true;
  if (["v", "V", "Ctrl-v"].includes(key)) state.visualUsed = true;
  updateStatus(key);
  window.setTimeout(completeIfReady, 0);
});

editor.on("change", () => {
  state.changed = true;
  state.value = editor.getValue();
  completeIfReady();
});

editor.on("cursorActivity", () => updateStatus());

els.nextBtn.addEventListener("click", nextLesson);
els.resetBtn.addEventListener("click", () => loadLesson(state.lessonIndex));

renderReferences();
loadLesson(0);
updateStatus();

if (window.lucide) {
  window.lucide.createIcons();
}
