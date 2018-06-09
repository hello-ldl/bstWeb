package web;

import java.io.File;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.alibaba.fastjson.JSON;


public class AppTest {
	public static void main(String[] args) {
		String path = "C:\\Users\\Administrator.USER-20140828MM\\Desktop\\bst\\网站资料\\Products";
		File file = new File(path);
		if(file.exists() && file.isDirectory()){
			List<Map<String,Object>> list1 = new ArrayList<Map<String,Object>>();
			for(File f1 : file.listFiles()){
				Map<String,Object> map1 = new HashMap<String,Object>();
				if(file.isDirectory()){
					List<Map<String,Object>> list2 = new ArrayList<Map<String,Object>>();
					for(File f2 : f1.listFiles()){
						Map<String,Object> map2 = new HashMap<String,Object>();
						if(f2.isFile()){
							map2.put("name", f1.getName() + "/" + f2.getName());
							list2.add(map2);
						}
					}
					System.out.println(f1.getName() + JSON.toJSONString(list2));
					System.out.println(f1.getName() + list2.size());
					list1.addAll(list2);
				}
			}
			System.out.println("all" + JSON.toJSONString(list1));
			System.out.println("all" + list1.size());
		}
	}
}
