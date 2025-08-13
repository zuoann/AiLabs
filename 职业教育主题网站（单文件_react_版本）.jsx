import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  GraduationCap,
  BookOpen,
  Factory,
  Cpu,
  Hammer,
  Users,
  Calendar,
  Building2,
  BadgeCheck,
  Search,
  Filter,
  Mail,
  Phone,
  MapPinned,
  Rocket,
  Star,
} from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectValue,
  SelectItem,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip } from "recharts";

// ---- 假数据 ----
const programData = [
  {
    id: 1,
    title: "智能制造技术",
    type: "工程制造",
    level: "中职",
    duration: "3年",
    icon: <Factory className="w-5 h-5" />,
    desc: "以数控、工业机器人与MES为核心，校企共建实训线。",
    skills: ["数控编程", "工业机器人", "CAD/CAM"],
  },
  {
    id: 2,
    title: "软件开发与测试",
    type: "信息技术",
    level: "高职",
    duration: "3年",
    icon: <Cpu className="w-5 h-5" />,
    desc: "前后端一体化培养，企业真实项目驱动学习。",
    skills: ["React", "Java", "自动化测试"],
  },
  {
    id: 3,
    title: "现代农业与智能牧场",
    type: "农业与食品",
    level: "高职",
    duration: "3年",
    icon: <Hammer className="w-5 h-5" />,
    desc: "物联网监测、精准饲喂与畜产品质量追溯全链条。",
    skills: ["物联网", "数据分析", "食品安全"],
  },
  {
    id: 4,
    title: "电商与新媒体运营",
    type: "商贸与服务",
    level: "中职",
    duration: "3年",
    icon: <BookOpen className="w-5 h-5" />,
    desc: "直播、短视频与跨境电商融合，内容+供应链能力并重。",
    skills: ["直播运营", "数据投放", "供应链"],
  },
  {
    id: 5,
    title: "护理与老年照护",
    type: "健康与护理",
    level: "中高职贯通",
    duration: "5年",
    icon: <BadgeCheck className="w-5 h-5" />,
    desc: "临床基础+社区照护+康复训练，重视人文素养。",
    skills: ["基础护理", "康复", "健康管理"],
  },
];

const newsList = [
  {
    id: 1,
    date: "2025-08-10",
    title: "校企联合发布《岗位能力标准（试行）》",
    tag: "产教融合",
  },
  { id: 2, date: "2025-08-02", title: "2025级新生报到指南上线", tag: "通知" },
  { id: 3, date: "2025-07-25", title: "智能制造产线实训中心投入使用", tag: "实训" },
];

const eventList = [
  {
    id: 1,
    time: "2025-09-05",
    title: "企业导师开学第一课：行业趋势与岗位画像",
    place: "报告厅A301",
  },
  { id: 2, time: "2025-09-18", title: "技能节：跨专业项目马拉松", place: "综合实训楼" },
  { id: 3, time: "2025-10-12", title: "访企拓岗双选会（秋季）", place: "体育馆" },
];

const chartData = [
  { month: "3月", value: 120 },
  { month: "4月", value: 180 },
  { month: "5月", value: 240 },
  { month: "6月", value: 320 },
  { month: "7月", value: 420 },
  { month: "8月", value: 560 },
];

// ---- 小组件 ----
const Section = ({ id, title, subtitle, children }) => (
  <section id={id} className="py-16 md:py-24" aria-labelledby={`${id}-title`}>
    <div className="max-w-7xl mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mb-10 md:mb-14"
      >
        <h2 id={`${id}-title`} className="text-3xl md:text-4xl font-bold tracking-tight">
          {title}
        </h2>
        {subtitle && (
          <p className="mt-3 text-muted-foreground max-w-3xl">{subtitle}</p>
        )}
      </motion.div>
      {children}
    </div>
  </section>
);

// ---- 主页面 ----
export default function VocationalEducationSite() {
  const [query, setQuery] = useState("");
  const [type, setType] = useState("全部");
  const [level, setLevel] = useState("全部");

  const filtered = useMemo(() => {
    return programData.filter((p) => {
      const q = query.trim();
      const m1 = type === "全部" || p.type === type;
      const m2 = level === "全部" || p.level === level;
      const m3 = !q ||
        p.title.includes(q) ||
        p.desc.includes(q) ||
        p.skills.some((s) => s.includes(q));
      return m1 && m2 && m3;
    });
  }, [query, type, level]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-slate-50 text-slate-900">
      {/* 顶部导航 */}
      <header className="sticky top-0 z-50 border-b backdrop-blur supports-[backdrop-filter]:bg-white/70 bg-white/60">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center gap-3">
          <GraduationCap className="w-6 h-6" />
          <span className="font-semibold">职教·Edu</span>
          <nav className="ml-auto hidden md:flex items-center gap-6 text-sm">
            <a href="#about" className="hover:underline">关于</a>
            <a href="#programs" className="hover:underline">专业与课程</a>
            <a href="#enterprise" className="hover:underline">产教融合</a>
            <a href="#news" className="hover:underline">新闻活动</a>
            <a href="#admission" className="hover:underline">招生与服务</a>
          </nav>
          <Button className="ml-3" size="sm">
            立即咨询
          </Button>
        </div>
      </header>

      {/* 首屏 */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 [mask-image:radial-gradient(60%_60%_at_50%_30%,black,transparent)] bg-gradient-to-br from-indigo-100 via-white to-teal-100" />
        <div className="max-w-7xl mx-auto px-4 pt-16 pb-20 md:pb-28 grid md:grid-cols-2 gap-10 items-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-tight">
              面向未来岗位的
              <span className="bg-gradient-to-r from-indigo-600 to-teal-600 bg-clip-text text-transparent"> 职业教育</span>
            </h1>
            <p className="mt-5 text-lg text-muted-foreground max-w-prose">
              校企协同、工学结合、项目化学习，让每一位学生在真实情境中成长为高素质技术技能人才。
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button size="lg">
                <Rocket className="w-4 h-4 mr-2" /> 预约校园参观
              </Button>
              <Button size="lg" variant="outline">
                <BookOpen className="w-4 h-4 mr-2" /> 下载招生简章
              </Button>
            </div>
            <div className="mt-8 grid grid-cols-3 gap-4 text-center">
              <Card className="shadow-sm">
                <CardContent className="p-4">
                  <div className="text-3xl font-bold">96%</div>
                  <div className="text-xs text-muted-foreground mt-1">毕业去向落实率</div>
                </CardContent>
              </Card>
              <Card className="shadow-sm">
                <CardContent className="p-4">
                  <div className="text-3xl font-bold">300+</div>
                  <div className="text-xs text-muted-foreground mt-1">合作企业</div>
                </CardContent>
              </Card>
              <Card className="shadow-sm">
                <CardContent className="p-4">
                  <div className="text-3xl font-bold">1200+</div>
                  <div className="text-xs text-muted-foreground mt-1">实训工位</div>
                </CardContent>
              </Card>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, scale: .98 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6, delay: 0.1 }}>
            <Card className="shadow-md">
              <CardHeader>
                <CardTitle>实习与就业趋势</CardTitle>
                <CardDescription>近六个月学生签约与实习机会统计</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={chartData} margin={{ left: 0, right: 0 }}>
                      <defs>
                        <linearGradient id="g1" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="currentColor" stopOpacity={0.25} />
                          <stop offset="100%" stopColor="currentColor" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <XAxis dataKey="month" tickLine={false} axisLine={false} />
                      <YAxis tickLine={false} axisLine={false} />
                      <Tooltip />
                      <Area type="monotone" dataKey="value" stroke="currentColor" fill="url(#g1)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* 关于 */}
      <Section id="about" title="办学定位与育人目标" subtitle="坚持服务发展、促进就业，面向现代产业体系培养高素质技术技能人才。">
        <div className="grid md:grid-cols-3 gap-6">
          {[{
            icon: <Users className="w-5 h-5" />, title: "校企协同育人", desc: "企业导师进课堂，项目进课程，共建产业学院。"
          }, {
            icon: <Building2 className="w-5 h-5" />, title: "产教深度融合", desc: "共建共享实训基地，积极参与行业标准制定。"
          }, {
            icon: <Star className="w-5 h-5" />, title: "以赛促学促教", desc: "对接技能竞赛标准，打通教、学、做、赛闭环。"
          }].map((f, i) => (
            <Card key={i} className="shadow-sm">
              <CardHeader className="flex-row items-center gap-3">
                <div className="p-2 rounded-xl bg-slate-100">{f.icon}</div>
                <div>
                  <CardTitle className="text-lg">{f.title}</CardTitle>
                  <CardDescription>{f.desc}</CardDescription>
                </div>
              </CardHeader>
            </Card>
          ))}
        </div>
      </Section>

      {/* 专业与课程 */}
      <Section
        id="programs"
        title="专业与课程"
        subtitle="按产业链布局专业群，强化核心课程与关键技能。"
      >
        <div className="mb-6 grid md:grid-cols-3 gap-3">
          <div className="flex items-center gap-2">
            <Search className="w-4 h-4" />
            <Input
              placeholder="搜索专业 / 技能关键词"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4" /> 分类
            <Select value={type} onValueChange={setType}>
              <SelectTrigger className="w-full"><SelectValue placeholder="全部" /></SelectTrigger>
              <SelectContent>
                {['全部','工程制造','信息技术','农业与食品','商贸与服务','健康与护理'].map((t) => (
                  <SelectItem key={t} value={t}>{t}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center gap-2">
            层次
            <Select value={level} onValueChange={setLevel}>
              <SelectTrigger className="w-full"><SelectValue placeholder="全部" /></SelectTrigger>
              <SelectContent>
                {['全部','中职','高职','中高职贯通'].map((t) => (
                  <SelectItem key={t} value={t}>{t}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((p) => (
            <Card key={p.id} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-slate-100">{p.icon}</div>
                  <div>
                    <CardTitle className="text-xl">{p.title}</CardTitle>
                    <CardDescription>{p.type} · {p.level} · {p.duration}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm text-muted-foreground">{p.desc}</p>
                <div className="flex flex-wrap gap-2">
                  {p.skills.map((s) => (
                    <Badge key={s} variant="secondary" className="rounded-full">{s}</Badge>
                  ))}
                </div>
                <div className="flex gap-3 pt-1">
                  <Button size="sm" variant="outline">课程大纲</Button>
                  <Button size="sm">申请报名</Button>
                </div>
              </CardContent>
            </Card>
          ))}
          {filtered.length === 0 && (
            <div className="col-span-full text-sm text-muted-foreground">未找到匹配的专业，试试更换关键词或筛选条件。</div>
          )}
        </div>
      </Section>

      {/* 产教融合 */}
      <Section id="enterprise" title="产教融合" subtitle="共建共享，协同育人：产业学院、现代学徒制、企业真实场景项目。">
        <Tabs defaultValue="coops" className="w-full">
          <TabsList>
            <TabsTrigger value="coops">合作企业</TabsTrigger>
            <TabsTrigger value="projects">典型项目</TabsTrigger>
            <TabsTrigger value="policy">制度保障</TabsTrigger>
          </TabsList>
          <TabsContent value="coops" className="mt-6 grid md:grid-cols-3 gap-6">
            {["华芯半导体","联创智造","星链物流","康宁健康","农慧物联","云商科技"].map((n) => (
              <Card key={n} className="shadow-sm">
                <CardHeader>
                  <CardTitle className="text-lg">{n}</CardTitle>
                  <CardDescription>共建基地 · 订单班 · 企业导师</CardDescription>
                </CardHeader>
                <CardContent className="flex items-center gap-4 text-sm text-muted-foreground">
                  <Users className="w-4 h-4" /> 每年提供 ≥ 50 个实习岗位
                </CardContent>
              </Card>
            ))}
          </TabsContent>
          <TabsContent value="projects" className="mt-6">
            <Accordion type="single" collapsible>
              {[{
                k: "工业互联网产线改造实训",
                d: "学生与企业工程师共建边缘计算网关、设备上云、数据可视化看板。"
              },{
                k: "智慧牧场数字孪生",
                d: "采集环境与个体数据，构建孪生场景，优化饲喂与健康管理。"
              },{
                k: "跨境电商直播IP打造",
                d: "从选品、脚本到复盘，覆盖供应链协同与数据分析。"
              }].map((it) => (
                <AccordionItem key={it.k} value={it.k}>
                  <AccordionTrigger>{it.k}</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">{it.d}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </TabsContent>
          <TabsContent value="policy" className="mt-6 grid md:grid-cols-3 gap-6">
            {[{
              t: "企业导师聘任机制",
              d: "签订三方协议，明确教学任务、考核与激励。"
            },{
              t: "项目式课程标准",
              d: "以真实任务为载体，成果可评价、可展示。"
            },{
              t: "学分互认与弹性学制",
              d: "工作学习一体化，鼓励灵活学习路径。"
            }].map((p) => (
              <Card key={p.t}>
                <CardHeader>
                  <CardTitle className="text-lg">{p.t}</CardTitle>
                  <CardDescription className="text-muted-foreground">{p.d}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </TabsContent>
        </Tabs>
      </Section>

      {/* 新闻与活动 */}
      <Section id="news" title="新闻 · 通知 · 活动">
        <div className="grid md:grid-cols-2 gap-6 lg:gap-10">
          <div>
            <h3 className="text-xl font-semibold mb-4 flex items-center gap-2"><Calendar className="w-5 h-5"/>近期活动</h3>
            <div className="space-y-3">
              {eventList.map((e) => (
                <Card key={e.id} className="shadow-sm">
                  <CardContent className="p-4 flex items-center justify-between">
                    <div>
                      <div className="font-medium">{e.title}</div>
                      <div className="text-xs text-muted-foreground mt-1">{e.place}</div>
                    </div>
                    <Badge variant="secondary" className="rounded-full">{e.time}</Badge>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-4 flex items-center gap-2"><NewsIcon/>新闻/通知</h3>
            <div className="space-y-3">
              {newsList.map((n) => (
                <Card key={n.id} className="shadow-sm">
                  <CardContent className="p-4 flex items-center justify-between">
                    <div>
                      <div className="font-medium">{n.title}</div>
                      <div className="text-xs text-muted-foreground mt-1">{n.tag}</div>
                    </div>
                    <Badge variant="secondary" className="rounded-full">{n.date}</Badge>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* 招生与服务 */}
      <Section id="admission" title="招生与学生服务" subtitle="从报到到就业，全流程服务体系。">
        <div className="grid lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>常见问题</CardTitle>
              <CardDescription>报考条件、学费与奖助、宿舍与餐饮等</CardDescription>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible>
                <AccordionItem value="q1">
                  <AccordionTrigger>有哪些奖助学金？</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">设置国家奖助、校企奖学金与勤工助学岗位，覆盖优秀与困难学生群体。</AccordionContent>
                </AccordionItem>
                <AccordionItem value="q2">
                  <AccordionTrigger>如何申请企业定向班？</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">在报名系统选择意向企业，参加企业面试，通过后在校内完成定向培养。</AccordionContent>
                </AccordionItem>
                <AccordionItem value="q3">
                  <AccordionTrigger>是否提供实习就业推荐？</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">就业中心与学院联合提供岗位匹配、面试辅导与去向跟踪服务。</AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>联系招生办</CardTitle>
              <CardDescription>我们将于工作日24小时内回复</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-2 text-sm"><Phone className="w-4 h-4"/> 400-800-2025</div>
              <div className="flex items-center gap-2 text-sm"><Mail className="w-4 h-4"/> zsb@vocation.edu</div>
              <div className="flex items-center gap-2 text-sm"><MapPinned className="w-4 h-4"/> 教学楼一层招生服务中心</div>
              <Button className="w-full">在线咨询</Button>
            </CardContent>
          </Card>
        </div>
      </Section>

      {/* 页脚 */}
      <footer className="border-t mt-10">
        <div className="max-w-7xl mx-auto px-4 py-10 grid md:grid-cols-4 gap-8 text-sm">
          <div>
            <div className="flex items-center gap-2 font-semibold">
              <GraduationCap className="w-5 h-5"/> 职教·Edu
            </div>
            <p className="mt-3 text-muted-foreground">为每一位学生打造通向职业世界的高速公路。</p>
          </div>
          <div>
            <div className="font-medium mb-2">快速链接</div>
            <ul className="space-y-1 text-muted-foreground">
              <li><a href="#programs" className="hover:underline">专业与课程</a></li>
              <li><a href="#enterprise" className="hover:underline">产教融合</a></li>
              <li><a href="#news" className="hover:underline">新闻活动</a></li>
              <li><a href="#admission" className="hover:underline">招生服务</a></li>
            </ul>
          </div>
          <div>
            <div className="font-medium mb-2">资料下载</div>
            <ul className="space-y-1 text-muted-foreground">
              <li>招生简章（PDF）</li>
              <li>专业课程标准汇编</li>
              <li>企业合作手册</li>
            </ul>
          </div>
          <div>
            <div className="font-medium mb-2">关注我们</div>
            <p className="text-muted-foreground">微信公众号 / 抖音号 / B站</p>
            <div className="mt-3 flex gap-2">
              <Button variant="outline" size="sm">预约参观</Button>
              <Button size="sm">立即报名</Button>
            </div>
          </div>
        </div>
        <div className="text-center text-xs text-muted-foreground pb-8">© 2025 职教·Edu. All rights reserved.</div>
      </footer>
    </div>
  );
}

function NewsIcon(){
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
      <path d="M4 5a2 2 0 0 0-2 2v9a3 3 0 0 0 3 3h12a3 3 0 0 0 3-3V7a2 2 0 0 0-2-2H4zm1 3h10v2H5V8zm0 4h10v2H5v-2zm0 4h7v2H5v-2z"/>
    </svg>
  )
}
